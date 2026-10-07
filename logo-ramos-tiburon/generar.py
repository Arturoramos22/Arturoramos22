import math, sys
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen

FONT = "/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"
WORD = "RAMOS"
TRACK = 40  # extra tracking in font units

font = TTFont(FONT)
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm
H = font["OS/2"].sCapHeight

class FlatPen(BasePen):
    """Flattens contours into dense polylines (list of lists of (x,y))."""
    def __init__(self, gs, dx):
        super().__init__(gs); self.dx = dx; self.contours = []; self.cur = None
    def _moveTo(self, p):
        self.cur = [(p[0]+self.dx, p[1])]; self.contours.append(self.cur)
    def _lineTo(self, p):
        x0,y0 = self.cur[-1]; x1,y1 = p[0]+self.dx, p[1]
        n = max(1, int(math.hypot(x1-x0,y1-y0)/12))
        for i in range(1,n+1):
            t=i/n; self.cur.append((x0+(x1-x0)*t, y0+(y1-y0)*t))
    def _curveToOne(self, p1, p2, p3):
        x0,y0 = self.cur[-1]
        pts=[(x0,y0),(p1[0]+self.dx,p1[1]),(p2[0]+self.dx,p2[1]),(p3[0]+self.dx,p3[1])]
        n=24
        for i in range(1,n+1):
            t=i/n; mt=1-t
            x=mt**3*pts[0][0]+3*mt*mt*t*pts[1][0]+3*mt*t*t*pts[2][0]+t**3*pts[3][0]
            y=mt**3*pts[0][1]+3*mt*mt*t*pts[1][1]+3*mt*t*t*pts[2][1]+t**3*pts[3][1]
            self.cur.append((x,y))
    def _closePath(self): pass
    def _endPath(self): pass

# layout letters
contours=[]; x=0
for ch in WORD:
    g = cmap[ord(ch)]
    pen = FlatPen(gs, x); gs[g].draw(pen)
    contours += pen.contours
    x += gs[g].width + TRACK
W = x - TRACK

# ---- shark envelope (in units of cap height), u in [0,1] left->right ----
def smooth(pts, u):
    """Catmull-Rom-ish interpolation through (u, value) control points."""
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    if u<=xs[0]: return ys[0]
    if u>=xs[-1]: return ys[-1]
    for i in range(len(xs)-1):
        if xs[i]<=u<=xs[i+1]:
            t=(u-xs[i])/(xs[i+1]-xs[i])
            p0=ys[i-1] if i>0 else ys[i]; p1=ys[i]; p2=ys[i+1]; p3=ys[i+2] if i+2<len(ys) else ys[i+1]
            return 0.5*((2*p1)+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t**3)

TOP = [(0.00,0.74),(0.25,1.00),(0.50,1.10),(0.75,0.98),(1.00,0.86)]
BOT = [(0.00,0.26),(0.25,-0.02),(0.50,-0.10),(0.75,0.02),(1.00,0.14)]
SHEAR = 0.10

def warp(px,py):
    u=px/W; v=py/H
    t=smooth(TOP,u); b=smooth(BOT,u)
    y=(b + v*(t-b))*H
    return px + SHEAR*y, y

def path_from_contours(cs, fn=lambda x,y:(x,y)):
    d=[]
    for c in cs:
        pts=[fn(x,y) for x,y in c]
        d.append("M"+" L".join(f"{x:.1f},{-y:.1f}" for x,y in pts)+"Z")
    return " ".join(d)

body = path_from_contours(contours, warp)

# ---- fins (in cap-height units, u fraction of W) ----
def P(u,v): return f"{u*W+SHEAR*v*H:.1f},{-v*H:.1f}"
def C(a,b,c): return f"C{a} {b} {c}"
# dorsal fin on top of the M (leaning back)
base = " ".join("L"+P(u/1000, smooth(TOP,u/1000)-0.02) for u in range(585,404,-5))
dorsal = (f"M{P(0.405,smooth(TOP,0.405)-0.02)} "+C(P(0.43,1.27),P(0.52,1.47),P(0.58,1.60))+" "
          +C(P(0.585,1.32),P(0.595,1.12),P(0.585,smooth(TOP,0.585)-0.02))+" "+base+" Z")
# pectoral fin under the A
pect = (f"M{P(0.20,0.02)} "+C(P(0.24,-0.14),P(0.30,-0.32),P(0.38,-0.50))+" "
        +C(P(0.36,-0.28),P(0.35,-0.12),P(0.36,0.00))+" Z")
# crescent caudal fin merging with the S
tail = (f"M{P(0.925,0.86)} "+C(P(0.985,1.05),P(1.03,1.25),P(1.09,1.46))+" "
        +C(P(1.06,1.14),P(1.045,0.82),P(1.025,0.55))+" "
        +C(P(1.045,0.30),P(1.07,-0.05),P(1.08,-0.42))+" "
        +C(P(1.03,-0.17),P(0.985,0.02),P(0.925,0.16))+" Z")

minx=-0.04*W; maxx=1.13*W
viewbox=f"{minx:.0f} {-1.8*H:.0f} {maxx-minx:.0f} {2.6*H:.0f}"
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}">
<rect x="{minx:.0f}" y="{-1.8*H:.0f}" width="{maxx-minx:.0f}" height="{2.6*H:.0f}" fill="white"/>
<g fill="#000" fill-rule="nonzero">
<path d="{dorsal}"/>
<path d="{pect}"/>
<path d="{tail}"/>
<path d="{body}"/>
</g>
</svg>'''
open(sys.argv[1] if len(sys.argv)>1 else "ramos.svg","w").write(svg)
print("W",W,"H",H,"upm",upm)

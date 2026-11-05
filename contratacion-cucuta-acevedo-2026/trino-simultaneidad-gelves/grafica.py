from datetime import date
C=[ # entidad, slot, ini, fin, valor, objeto corto
('Gobernación de Norte de Santander',1,'2026-01-19','2026-08-18',47775000),
('Gobernación de Norte de Santander',1,'2026-09-16','2026-12-30',23887500),
('Alcaldía de Cúcuta',2,'2026-01-21','2026-06-20',25000000),
('Alcaldía de Cúcuta',2,'2026-08-13','2026-12-27',22500000),
('Municipio de Los Patios',3,'2026-01-23','2026-06-22',17500000),
('Municipio de Los Patios',3,'2026-08-04','2026-11-03',10500000),
('IMRD de Los Patios',4,'2026-01-23','2026-07-22',20196000),
('IMRD de Los Patios',4,'2026-08-06','2026-12-31',16381200),
('Tránsito de Los Patios',5,'2026-01-16','2026-07-15',18900000),
('Tránsito de Los Patios',5,'2026-10-15','2026-12-29',7875000)]
OBJ={'Gobernación de Norte de Santander':'Asistencia técnica a proyectos de regalías','Alcaldía de Cúcuta':'Apoyo al banco de programas y proyectos de inversión',
'Municipio de Los Patios':'Elaboración y seguimiento de proyectos de inversión','IMRD de Los Patios':'Formulación y estructuración de proyectos de inversión',
'Tránsito de Los Patios':'Proyectos del plan de desarrollo'}
D0=date(2026,1,1); D1=date(2026,12,31); W=760; X0=330
def x(d): return X0+ (date.fromisoformat(d)-D0).days/((D1-D0).days+1)*W
def m(v): return f"{v/1e6:,.1f}".replace(',','X').replace('.',',').replace('X','.')
ents=list(dict.fromkeys(c[0] for c in C))
svg=[]; y0=40; rh=78
for i,e in enumerate(ents):
  y=y0+i*rh
  svg.append(f'<text x="0" y="{y+22}" class="ent">{e}</text><text x="0" y="{y+42}" class="obj">{OBJ[e]}</text>')
  for c in [c for c in C if c[0]==e]:
    a,b=x(c[2]),x(c[3]); d=(date.fromisoformat(c[3])-date.fromisoformat(c[2])).days+1; mes=c[4]/(d/30)
    svg.append(f'<rect x="{a:.1f}" y="{y+8}" width="{b-a-2:.1f}" height="26" rx="4" fill="var(--s{c[1]})"/>')
    svg.append(f'<text x="{a+4:.1f}" y="{y+52}" class="lab">${m(c[4])} M · <tspan class="b">${m(mes)} M/mes</tspan></text>')
    svg.append(f'<text x="{a+4:.1f}" y="{y+68}" class="dt">{c[2][8:]}/{c[2][5:7]} → {c[3][8:]}/{c[3][5:7]}</text>')
MES=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
grid=''.join(f'<line x1="{x(f"2026-{k+1:02d}-01"):.1f}" x2="{x(f"2026-{k+1:02d}-01"):.1f}" y1="30" y2="{y0+5*rh}" class="g"/><text x="{x(f"2026-{k+1:02d}-01")+4:.1f}" y="24" class="ax">{MES[k]}</text>' for k in range(12))
# mensual
V=[8.47,20.24,22.41,21.68,22.41,19.10,11.01,13.25,15.05,20.81,18.46,17.63]; N=[5,5,5,5,5,5,3,4,4,5,5,4]
bw=W/12; H=170; by=y0+5*rh+80
bars=''
for k,v in enumerate(V):
  h=v/25*H; bx=X0+k*bw+6
  bars+=f'<rect x="{bx:.1f}" y="{by+H-h:.1f}" width="{bw-12:.1f}" height="{h:.1f}" rx="4" fill="var(--bar)"/><text x="{bx+(bw-12)/2:.1f}" y="{by+H-h-8:.1f}" class="bv" text-anchor="middle">{str(v).replace(".",",")}</text><text x="{bx+(bw-12)/2:.1f}" y="{by+H+20:.1f}" class="ax" text-anchor="middle">{MES[k]}</text><text x="{bx+(bw-12)/2:.1f}" y="{by+H+38:.1f}" class="dt" text-anchor="middle">{N[k]} contr.</text>'
bars+=f'<line x1="{X0}" x2="{X0+W}" y1="{by+H}" y2="{by+H}" class="base"/><text x="0" y="{by+30}" class="ent">Lo que suma cada mes</text><text x="0" y="{by+52}" class="obj">millones de pesos, prorrateado por días</text><text x="0" y="{by+74}" class="obj">de vigencia de cada contrato</text>'
html=f'''<!doctype html><html><head><meta charset="utf-8"><style>
:root{{--s1:#2a78d6;--s2:#eb6834;--s3:#1baf7a;--s4:#eda100;--s5:#e87ba4;--bar:#52514e;}}
body{{margin:0;background:#fcfcfb;font-family:Inter,"Helvetica Neue",Arial,sans-serif;color:#0b0b0b}}
.w{{padding:44px 48px 30px;width:1104px}}
h1{{font-size:34px;line-height:1.15;margin:0 0 10px}} .sub{{font-size:19px;color:#52514e;margin:0 0 18px;line-height:1.35}}
.k{{display:flex;gap:16px;margin:0 0 14px}} .k div{{flex:1;border:1px solid #e3e2dd;border-radius:10px;padding:12px 16px}}
.k b{{display:block;font-size:30px}} .k span{{font-size:15px;color:#52514e}}
.ent{{font-size:16px;font-weight:700;fill:#0b0b0b}} .obj{{font-size:12.5px;fill:#52514e}} .lab{{font-size:13px;fill:#0b0b0b}} .b{{font-weight:700}}
.dt{{font-size:12px;fill:#6b6a66}} .ax{{font-size:13px;fill:#52514e}} .g{{stroke:#ecebe7;stroke-width:1}} .base{{stroke:#bdbcb6}} .bv{{font-size:14px;font-weight:700;fill:#0b0b0b}}
.f{{font-size:13px;color:#52514e;margin-top:6px;line-height:1.4}}
</style></head><body><div class="w">
<h1>Un contratista, 5 entidades públicas, 10 contratos de prestación de servicios en 2026</h1>
<p class="sub">Carlos Alberto Gelves Mogollón tuvo hasta <b>5 contratos vigentes al mismo tiempo</b>, todos para formular o hacer seguimiento a proyectos de inversión.</p>
<div class="k"><div><b>$210,5 M</b><span>valor total de los 10 contratos</span></div><div><b>5 a la vez</b><span>de enero a junio y de nuevo en octubre-noviembre</span></div><div><b>≈ $22 M/mes</b><span>en los meses de mayor simultaneidad</span></div></div>
<svg width="1104" height="{by+H+50}" font-family="inherit">{grid}{''.join(svg)}{bars}</svg>
<div class="f">Elaboración propia con datos de SECOP II – Contratos Electrónicos (datos.gov.co, conjunto jbjy-vk9h), consulta del 5-nov-2026. Fechas de inicio y fin y valores tal como están registrados en SECOP. Valor mes = valor del contrato ÷ (días de duración ÷ 30). La prestación de servicios no exige exclusividad: la simultaneidad es un indicio, no una prueba.</div>
</div></body></html>'''
open('/tmp/claude-0/-home-user-Arturoramos22/5d41b7db-fe77-5f1b-af28-c88e697c6188/scratchpad/caps/grafica.html','w').write(html)

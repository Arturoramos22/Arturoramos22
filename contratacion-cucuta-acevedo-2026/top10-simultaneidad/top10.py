import json,collections,sys
from datetime import date,timedelta
D=sys.argv[1]
per={json.loads(l)['id_contrato']:json.loads(l) for l in open(D+'/contratos.jsonl')}
CUC={'890501434','807001836','8905014335','807004352','890500529','800153197'}
def directa(x): m=x.get('modalidad_de_contratacion',''); return 'irecta' in m or 'especial' in m
def ini(x): return (x.get('fecha_de_inicio_del_contrato') or x.get('fecha_de_firma') or '')[:10]
by=collections.defaultdict(dict)
for l in open(D+'/ext_full.jsonl'):
    x=json.loads(l)
    if directa(x): by[x['documento_proveedor']][x['id_contrato']]=x
for r in per.values():
    if r['tipodocproveedor']!='NIT' and 'Servicios profesionales' in r['justificacion_modalidad_de']:
        by[r['documento_proveedor']][r['id_contrato']]=r
CERR=('terminado','cerrado','cedido','cancelado')
res=[]
for doc,cs in by.items():
    if not any(c in per and 'Servicios profesionales' in per[c]['justificacion_modalidad_de'] for c in cs): continue
    det=[]
    for x in cs.values():
        s,e=ini(x),(x.get('fecha_de_fin_del_contrato') or '')[:10]
        if not e or not s or e<s: continue
        dd=(date.fromisoformat(e)-date.fromisoformat(s)).days+1
        st=(x.get('estado_contrato') or '').lower()
        if dd<15 or st in ('cedido','cancelado') or (st in ('terminado','cerrado') and e>='2026-11-05'): continue
        v=float(x['valor_del_contrato']); det.append(dict(id=x['id_contrato'],ent=x['nombre_entidad'],nit=x['nit_entidad'],ini=s,fin=e,v=v,mes=v/(dd/30),per=x['id_contrato'] in per,obj=x['objeto_del_contrato']))
    if len(det)<2: continue
    cuts=sorted({c['ini'] for c in det}|{(date.fromisoformat(c['fin'])+timedelta(1)).isoformat() for c in det})
    best=None;bestall=None
    for i in range(len(cuts)-1):
        t0=cuts[i]; t1=(date.fromisoformat(cuts[i+1])-timedelta(1)).isoformat()
        if (date.fromisoformat(t1)-date.fromisoformat(t0)).days+1<7: continue
        act=[c for c in det if c['ini']<=t0 and c['fin']>=t1]
        if len(act)<2: continue
        t=dict(desde=t0,hasta=t1,n=len(act),mes=sum(c['mes'] for c in act),ids=[c['id'] for c in act])
        if bestall is None or t['mes']>bestall['mes']: bestall=t
        if any(c['per'] for c in act) and (best is None or t['mes']>best['mes']): best=t
    if best: res.append(dict(doc=doc,nombre=next(iter(cs.values()))['proveedor_adjudicado'],best=best,bestall=bestall,det=sorted(det,key=lambda c:c['ini']),
                             total=sum(c['v'] for c in det)))
res.sort(key=lambda r:-r['best']['mes'])
json.dump(res,open(D+'/sim_full.json','w'),ensure_ascii=False)
print('personas',len(res),'>=3',sum(1 for r in res if r['best']['n']>=3))
for k,r in enumerate(res[:14],1):
    b=r['best']; print(k,r['nombre'],r['doc'],'| pico Cúcuta',round(b['mes']/1e6,1),b['n'],b['desde'],b['hasta'],'| pico personal',round(r['bestall']['mes']/1e6,1),r['bestall']['n'],'| contratos',len(r['det']),'total',round(r['total']/1e6,1))

S = 'https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID='
ALERTAS = [
 dict(riesgo='ALTO', tipo='Concentración en un mismo contratista + adiciones al tope + posible fraccionamiento',
  entidad='Alcaldía', contratista='JOSÉ ANDRÉS HERNÁNDEZ MEJÍA (CC 1090372670) y AVENTOURS TRAVEL GROUP (NIT 901913440), de la cual él es el representante legal',
  contratos='13 contratos: R-433, B-240, R-447, R-489, R-461, R-491, R-492 (persona natural); R-484, R-490, R-851, R-817, H-208, H-210 (Aventours)',
  valor=4268100000,
  hechos=('Una misma persona contrató 3.234 millones a su nombre (7 contratos) y 1.034 millones a través de Aventours Travel Group, empresa que '
          'representa legalmente (6 contratos). En total son 4.268 millones entre abril y octubre de 2026, todos de logística, bienestar laboral, tiquetes aéreos y eventos. '
          'En casi todos los procesos competitivos fue el único oferente. Cuatro contratos quedaron adicionados entre el 47% y el 50% sobre el presupuesto inicial: B-240 (300→450 millones), '
          'R-489 de tiquetes para el alcalde y los secretarios (128,5→192,8), R-484 (170→254) y R-490 (170→250). R-484 y R-490 se tramitaron como mínima cuantía (base de 170 millones, justo debajo del tope de 175,1). '
          'Ambos son "apoyo logístico a los procesos electorales de la Registraduría", para la primera y la segunda vuelta presidencial, y con las adiciones quedaron por encima del tope de esa modalidad. '
          'R-491 (206 millones) y R-492 (501 millones) se firmaron el mismo día, 29-sep-2026, tienen el mismo objeto (bienestar laboral de la Secretaría de Educación, uno para docentes y otro para administrativos), el mismo supervisor y el mismo ordenador del gasto.'),
  criterio=('Fraccionamiento: dividir un mismo objeto para usar una modalidad de menor exigencia está prohibido por los principios de planeación y selección objetiva (Ley 80 de 1993, arts. 24-25 y 29; Ley 1150 de 2007, art. 2). '
            'Las adiciones de casi el 50% (Ley 80, art. 40, par.) muestran una planeación deficiente y, al sumarse, superan el tope de la modalidad usada. '
            'La concentración en una sola persona natural pone en duda su capacidad operativa y financiera para ejecutar más de 4.000 millones.'),
  verificar=('Pedir los estudios del sector y comparar precios unitarios (tiquetes, refrigerios, transporte). Revisar los informes de supervisión y las facturas, y confirmar los subcontratistas reales. '
             'Consultar RUES: fecha de constitución de Aventours (NIT 901913440, al parecer de 2025), socios y actividad. Revisar si la misma persona aparece en otras entidades.'),
  url=S + 'CO1.NTC.10283233'),

 dict(riesgo='ALTO', tipo='Contratación directa "interadministrativa" con una sociedad de economía mixta recién creada',
  entidad='Alcaldía (Promoción Turística y Cultura)', contratista='EMPRESA DE EXPOSICIÓN DE CÚCUTA CIUDAD DESTINO S.A.S. – WORLD GO COLOMBIA S.A.S. (NIT 901990330); R.L. Ronald Eduardo Pancha Vivas',
  contratos='PT-41 (CO1.PCCNTR.9642489), CP-82, PT-52, CP-135 y comodato DA-2', valor=6351900000,
  hechos=('El comodato la denomina "sociedad de economía mixta", pero RUES la registra como S.A.S. comercial matriculada el 18-sep-2025. Entre el 10-jul y el 16-oct-2026 recibió 4 contratos directos con la causal "interadministrativo", por 6.352 millones: '
          'actividades culturales y de promoción (PT-41: firmado por 1.845 millones y adicionado a 2.745 millones el 25-jul, +48,8% a los 15 días de la firma, con una duración de 2 meses), artistas para "Cúcuta Gospel" (712,5), estrategia navideña "Cúcuta Ciudad Destino" (1.984,4) y logística de "Cúcuta Gospel" (910). '
          'El 29-oct-2026 el propio alcalde Jorge Enrique Acevedo firmó como ordenador del gasto un comodato gratuito a 5 años de dos locales municipales para la sede de esta empresa. '
          'En PT-41 SECOP no registra supervisor ni ordenador del gasto.'),
  criterio=('La contratación directa interadministrativa (Ley 1150, art. 2, num. 4, lit. c) solo procede con entidades estatales. Una sociedad de economía mixta solo cuenta como tal si el capital público es mayoritario. '
            'Aun así, la misma norma excluye de la vía directa los contratos de obra y de suministro con sociedades de economía mixta, que deben ir a licitación o selección abreviada. '
            'Contratar eventos y artistas a través de un vehículo creado para eso puede ser una intermediación para evitar la selección objetiva. '
            'Si la empresa subcontrata casi todo el objeto, la entidad paga además un costo de administración y pierde el control.'),
  verificar=('Pedir el acto de creación, los estatutos y la composición accionaria: qué porcentaje es público y quién es el socio privado (World Go Colombia S.A.S.). '
             'Pedir los subcontratos que celebró la empresa con estos recursos, los precios de los artistas y los informes de supervisión. Revisar el acuerdo del Concejo que autorizó su creación y el comodato.'),
  url=S + 'CO1.NTC.10488698'),

 dict(riesgo='ALTO', tipo='Convenios directos para obra con una S.A.S. "estatal" de 2025 que ya acumula ~$228.000 millones con Cúcuta',
  entidad='Alcaldía (Infraestructura) e IMRD', contratista='EMPRESA NACIONAL ESTATAL DE DESARROLLO TERRITORIAL S.A.S. – E-DESARROLLO (NIT 901902466); R.L. Alirio Enrique Sotomonte Motta',
  contratos='K-127 (CO1.PCCNTR.9684862) y convenio IMRD (CO1.PCCNTR.9773098)', valor=3024700000,
  hechos=('El 17-jul-2026 la Alcaldía firmó un convenio de 2.614,7 millones para "articular integralmente" el proyecto BPIN 2024540010119 de construcción u optimización del acueducto urbano y rural. '
          'El 11-ago-2026 el IMRD firmó otro de 410 millones para construir el cerramiento de la cancha de Palmarito. Ninguno de los dos tuvo proceso competitivo. Es una S.A.S. matriculada el 02-ene-2025, y el municipio de Cúcuta es accionista minoritario (25,5%, según prensa).'),
  criterio=('Los objetos son, en sustancia, obras. Encargarlas por convenio interadministrativo a una sociedad que luego las subcontrata elude la licitación pública. '
            'Este es un patrón señalado por la Contraloría y la Procuraduría con empresas "estatales" de municipios pequeños usadas como intermediarias. '
            'Ley 1150, art. 2, num. 4, lit. c, y art. 2, num. 1 (licitación para obra).'),
  verificar=('Verificar la naturaleza jurídica real (EICE o S.A.S. con capital público), quiénes son sus accionistas, su experiencia y su capacidad técnica. '
             'Pedir la cuota de administración que cobra, los subcontratos de obra y cómo se seleccionó a los subcontratistas.'),
  url=S + 'CO1.NTC.10538517'),

 dict(riesgo='ALTO', tipo='Catastro: menor cuantía con presupuesto pegado al tope, único oferente y adición del 47,7%',
  entidad='Alcaldía (Hacienda – Catastro)', contratista='MAPPER GIS INGENIERÍA S.A.S. (NIT 901206863)', contratos='L-430 (CO1.PCCNTR.9419451)', valor=2583670586,
  hechos=('Proceso de selección abreviada de menor cuantía con presupuesto base de 1.749.810.588 pesos, apenas 1,1 millones por debajo del tope de menor cuantía (1.750,9 millones). '
          'SECOP registra 16 visualizaciones, 4 invitados y una sola oferta, que se adjudicó por 1.749.810.586 (dos pesos menos que el presupuesto). '
          'El 25-sep-2026 se adicionó hasta 2.583,7 millones (+47,7%). El objeto son "servicios profesionales y tecnológicos especializados" para preparar los insumos de la actualización catastral.'),
  criterio=('Un presupuesto fijado justo debajo del tope y una adición posterior cercana al 50% son la señal típica para eludir la licitación pública. '
            'Si el objeto es de consultoría (estudios e insumos técnicos), la modalidad obligatoria es el concurso de méritos (Ley 1150, art. 2, num. 3). '
            'Una sola oferta en un proceso de este valor indica que los requisitos pudieron restringir la participación.'),
  verificar=('Revisar el estudio de mercado y cómo se calculó el presupuesto, los requisitos habilitantes (experiencia exigida) y las observaciones al pliego. '
             'Revisar también la justificación de la adición y si el gestor catastral está habilitado ante el IGAC.'),
  url=S + 'CO1.NTC.10127467'),

 dict(riesgo='ALTO', tipo='Encargo fiduciario contratado directamente con la causal de "ciencia y tecnología"',
  entidad='Alcaldía (Hacienda)', contratista='BBVA ASSET MANAGEMENT S.A. SOCIEDAD FIDUCIARIA (BBVA Fiduciaria)', contratos='R-479 (CO1.PCCNTR.9456905)', valor=187521925,
  hechos=('El 17-abr-2026, en plena Ley de Garantías, la Alcaldía contrató directamente un encargo fiduciario para recaudar y administrar sus recursos y garantizar el pago de la deuda reestructurada. '
          'Registró como causal "contratos para el desarrollo de actividades científicas y tecnológicas". Es el único contrato directo firmado por la Alcaldía entre el 8-mar y el 21-jun-2026.'),
  criterio=('Un encargo fiduciario de recaudo no es una actividad científica ni tecnológica (Ley 1150, art. 2, num. 4, lit. e; Decreto-Ley 591 de 1991). Los encargos fiduciarios de las entidades territoriales se seleccionan por licitación o selección abreviada (Ley 80, art. 32, num. 5). '
            'Usar una causal que no corresponde, justo durante la restricción de la Ley 996 de 2005 (art. 33), es una alerta seria.'),
  verificar=('Revisar si el encargo es una obligación del acuerdo de reestructuración de pasivos o del contrato de crédito, y si ese acuerdo designó la fiduciaria. '
             'Pedir el acto de justificación de la contratación directa.'),
  url=S + 'CO1.NTC.10211483'),

 dict(riesgo='ALTO', tipo='ESAL "todera" con convenios directos millonarios (Decreto 092 de 2017) en sectores sin relación entre sí',
  entidad='Alcaldía (Planeación, Bienestar Social, Gestión del Riesgo)', contratista='FUNDACIÓN UNIDOS HACIA UN MEJOR DESTINO – UNMED (NIT 900245671)',
  contratos='Convenios de acueductos rurales (CO1.PCCNTR.9732154) y Z-382; BS-198, BS-207 y J-131', valor=6073300000,
  hechos=('Cinco contratos por 6.073 millones en 3 meses, en objetos sin relación entre sí: acueductos rurales (2.200 millones, firmado el 29-jul), educación ambiental y cultura del agua (1.500 millones, 14-ago), '
          'paquetes nutricionales para adultos mayores (1.197 millones; base de 800 millones adicionada +49,6%), intervención con habitantes de calle (1.061 millones) y gestión de riesgo de desastres (115 millones). '
          'Los dos convenios más grandes (3.700 millones) se firmaron como "régimen especial" sin ofertas, con el mismo supervisor y el mismo ordenador del gasto. En las selecciones abreviadas fue el único oferente.'),
  criterio=('El Decreto 092 de 2017 exige que la ESAL tenga "reconocida idoneidad" en el objeto, y un proceso competitivo cuando hay más de una ESAL capaz. Solo se puede contratar directamente si la ESAL aporta al menos el 30% del valor (convenios de asociación, art. 5). '
            'Que una misma fundación sea "idónea" en acueductos, nutrición, habitante de calle y desastres a la vez es poco creíble y sugiere direccionamiento.'),
  verificar=('Pedir el certificado de reconocida idoneidad, el aporte en dinero o especie de la ESAL y cómo se verificó. Revisar los estados financieros de la fundación, su sede y su personal. '
             'Revisar a qué terceros subcontrató y las evidencias de ejecución (beneficiarios y obras).'),
  url=S + 'CO1.NTC.10604893'),

 dict(riesgo='ALTO', tipo='Convenios directos con ESAL de objeto genérico (Decreto 092)',
  entidad='Alcaldía (Planeación / Infraestructura)', contratista='FUNDACIÓN PARA EL DESARROLLO GLOBAL (NIT 901454711) y CORPOCERO (NIT 800104609, R.L. Franklin Toloza)',
  contratos='Z-639 (CO1.PCCNTR.9963022); K-126 (CO1.PCCNTR.9835266); D-248 (CO1.PCCNTR.9550908)', valor=4640000000,
  hechos=('Fundación para el Desarrollo Global: 2.480 millones el 17-sep-2026 para "el fortalecimiento e implantación institucional de los servicios públicos de acueducto, alcantarillado y aseo", sin ofertas y sin un objeto medible. '
          'CORPOCERO: 2.160 millones el 20-ago-2026 para "placemaking" e intervención del espacio público (2 ofertas; valor 8% por encima de la base). Antes, el 4-jun, había recibido a valor cero la administración y el '
          '"aprovechamiento económico" del espacio público Jardín de San Mateo, bajo el puente Carlos Ramírez París, sin supervisor ni ordenador registrados.'),
  criterio=('Un objeto indeterminado impide medir el cumplimiento y facilita pagos sin un producto verificable (principio de planeación). '
            'Ceder el aprovechamiento económico de un bien de uso público a una ESAL sin contraprestación debe sustentarse en el Decreto 1077 de 2015 y en un acto de convocatoria pública.'),
  verificar=('Pedir productos y entregables concretos, el cronograma y el aporte de la ESAL. Para el Jardín de San Mateo: qué ingresos genera, quién los recibe y si hubo convocatoria.'),
  url=S + 'CO1.NTC.10919259'),

 dict(riesgo='ALTO', tipo='Causal "interadministrativa" aplicada a entidades privadas / naturaleza jurídica inconsistente',
  entidad='Alcaldía e IMRD', contratista='ESCUELA DE GESTIÓN PÚBLICA Y PARTICIPACIÓN CIUDADANA (NIT 901545609); FUNDACIÓN CONGREGAR (NIT 807007375); FUNDACIÓN PARA EL DESEMPLEO (NIT 900357984)',
  contratos='Plan de medios (CO1.PCCNTR.10058727); R-432 (CO1.PCCNTR.9393159); IMRD (CO1.PCCNTR.10091716) y Expo Sport', valor=2861500000,
  hechos=('La Escuela de Gestión Pública y Participación Ciudadana recibió 200 millones en marzo como ESAL (Decreto 092) y luego 1.440 millones el 9-oct-2026 como "contrato interadministrativo" para la "estructuración y difusión integral del plan de medios". '
          'Una entidad no puede ser ESAL privada y entidad pública al mismo tiempo. En el contrato de 1.440 millones la misma funcionaria es supervisora y ordenadora del gasto. '
          'El IMRD firmó con la Fundación Congregar (1.154,3 millones, 20-oct) y con la Fundación para el Desempleo (67,2 millones) bajo la causal "interadministrativo", sin proceso.'),
  criterio=('La causal interadministrativa (Ley 1150, art. 2, num. 4, lit. c) solo aplica entre entidades estatales. Usarla con fundaciones privadas elude el Decreto 092 y la selección objetiva. '
            'La pauta y el plan de medios deben contratarse de forma competitiva. El plan de medios de octubre de 2026 llega cerca del ciclo electoral local de 2027, lo que exige vigilar que no haya promoción de la imagen de funcionarios (Ley 1474 de 2011, art. 10).'),
  verificar=('Pedir el certificado de existencia y representación de cada entidad y verificar si son públicas o privadas. '
             'Pedir el plan de medios: qué medios, qué tarifas, quién lo ejecutó y qué contenidos se difundieron. Revisar si hubo subcontratación con medios afines.'),
  url=S + 'CO1.NTC.11045511'),

 dict(riesgo='ALTO', tipo='Interadministrativos de alto valor con entidades externas (posible intermediación)',
  entidad='Alcaldía (Hacienda, Educación)', contratista='INNOVATECH E.I.C.E. (NIT 890309152; R.L. Fernando Céspedes) y REDSUMMA (NIT 901417108)', contratos='R-848 (CO1.PCCNTR.9973790); B-224 (CO1.PCCNTR.9982055)', valor=3398000000,
  hechos=('INNOVATECH E.I.C.E.: 2.000,4 millones (21-sep-2026) para intervenir los archivos de la Secretaría de Hacienda, sin proceso. '
          'REDSUMMA: 1.397,6 millones (23-sep-2026) para conectividad e internet en las sedes educativas, con una sola respuesta. '
          'El mismo supervisor (Ricardo René García Cruz) vigila también el contrato de 1.000 millones de Espinel Villamizar (revisión del ciclo contractual).'),
  criterio=('Cuando la entidad ejecutora no tiene capacidad propia y subcontrata, el convenio interadministrativo funciona como intermediación: hay sobrecosto y se evita la competencia. '
            'La gestión documental y la conectividad tienen un mercado amplio de proveedores (Ley 1150, art. 2, num. 4, lit. c).'),
  verificar='Verificar el domicilio, la capacidad y la experiencia de cada ejecutora, los subcontratos, el porcentaje de administración y los precios frente al Acuerdo Marco o el mercado (conectividad).',
  url=S + 'CO1.NTC.10934349'),

 dict(riesgo='ALTO', tipo='Baja competencia sistemática: único oferente en el 69% de los procesos competitivos',
  entidad='Todas (sobre todo la Alcaldía)', contratista='Varios', contratos='74 de 107 contratos de procesos competitivos (ver hoja "Banderas por contrato")', valor=34969000000,
  hechos=('De 107 contratos de procesos competitivos con datos de oferentes, 74 (34.969 millones) tuvieron un solo oferente. En selección abreviada de menor cuantía fueron 22 de 26 (19.322 millones), en subasta inversa 6 de 10 y en mínima cuantía 40 de 63. '
          'Ejemplos: la licitación de escenarios deportivos del IMRD (UT Escenarios 2026, único oferente, base 2.800 millones adicionada a 3.965,6, +41,6%); '
          'señalización vial (UT Movilidad Cucuteña, 2.000 millones); seguros (Aseguradora Solidaria, 1.727 millones); bienes para el adulto mayor (AMAVI, 1.700 millones).'),
  criterio=('La pluralidad de oferentes es el indicador básico de selección objetiva (Ley 1150, art. 5). Que la mayoría de procesos tenga un único oferente es la señal de alerta n.º 1 en las metodologías de riesgo de corrupción de Colombia Compra Eficiente, la OCDE y Transparencia por Colombia, '
            'y sugiere pliegos "sastre", requisitos restrictivos o plazos cortos.'),
  verificar='Para los procesos de mayor valor: revisar las observaciones al pliego, los requisitos de experiencia y los indicadores financieros, los plazos de presentación y si hubo interesados que no ofertaron.',
  url=S + 'CO1.NTC.10110846'),

 dict(riesgo='MEDIO', tipo='Adiciones cercanas al tope legal del 50%',
  entidad='Alcaldía e IMRD', contratista='Varios (Leimer Javier Cárdenas Meza, Fundación UNMED, José Andrés Hernández, Aventours, Mapper Gis, Empresa de Exposición, Socicontrol, Offidiseños)', contratos='Ver hoja "Banderas por contrato"', valor=17000000000,
  hechos=('11 contratos tienen un valor actual entre 40% y 50% por encima de su presupuesto inicial. Ejemplos: vacunación antirrábica de Leimer Javier Cárdenas Meza (863,9→1.295,8 millones, +50,0%), adultos mayores de UNMED (+49,6%), Aventours (+49,4% y +47,1%), '
          'José Andrés Hernández (+50,0% dos veces), Mapper Gis (+47,7%), Empresa de Exposición (+48,8%) y UT Escenarios del IMRD (+41,6%). '
          'Además, el convenio de la Corporación Mixta de Promoción de Norte de Santander pasó de 70 a 132,6 millones (+89,4%).'),
  criterio=('El art. 40 de la Ley 80 permite adicionar hasta el 50% del valor inicial. Un patrón repetido de adiciones casi al tope indica una subestimación deliberada del presupuesto para usar una modalidad menos exigente. '
            'La Corporación Mixta supera el 50%: hay que verificar si los 70 millones eran solo el aporte del municipio o si se rebasó el límite.'),
  verificar='Revisar la justificación técnica de cada adición, el estudio de mercado inicial y si la adición respondía a hechos imprevisibles.',
  url=S + 'CO1.NTC.10137507'),

 dict(riesgo='MEDIO', tipo='Presupuestos agrupados justo debajo de los umbrales de modalidad',
  entidad='Alcaldía', contratista='Varios', contratos='19 mínimas cuantías con base de 160 a 175,09 millones; 4 menores cuantías con base de 1.700 a 1.749,8 millones', valor=0,
  hechos=('De los 63 procesos de mínima cuantía con presupuesto registrado, 19 (30%) tienen un presupuesto entre 160 y 175,09 millones, justo debajo del tope de 175,09 millones. '
          'En menor cuantía, 4 procesos tienen base de 1.700 a 1.749,8 millones, frente a un tope de 1.750,9: Mapper Gis, UT Los Ángeles 2026 (obra de espacio público, 1.730), AMAVI (1.700) y seguros (1.704).'),
  criterio='Agruparse en el borde del umbral es un indicador estadístico de fraccionamiento o de ajuste del presupuesto para evitar la modalidad superior (Decreto 1082 de 2015, art. 2.2.1.1.1.6.1, sobre el análisis del sector).',
  verificar='Revisar si hay objetos similares contratados en fechas cercanas con el mismo proveedor (ver hoja "Top contratistas") y el sustento de cada presupuesto.'),

 dict(riesgo='MEDIO', tipo='Contratos directos de "apoyo a la gestión" con empresas y medios',
  entidad='Alcaldía', contratista='ESPINEL VILLAMIZAR ASOCIADOS S.A.S. (NIT 900793360); DIOMAR GARCÍA EVENTOS S.A.S. (NIT 900575452); CARACOL S.A. (NIT 860014923); CONSULTORES LAF (NIT 800214941)',
  contratos='R-443 (CO1.PCCNTR.9636312); PT-50 (CO1.PCCNTR.9737557); OP-93 (CO1.PCCNTR.10114551); R-611', valor=2240000000,
  hechos=('Espinel Villamizar Asociados: 1.000 millones (8-jul-2026) por contratación directa para "revisión técnica y jurídica integral del ciclo contractual" del municipio. '
          'Diomar García Eventos: 800 millones (30-jul) por "apoyo a la gestión para la habilitación, operación, promoción y comercialización EXCLUSIVA de un espacio público" en las Ferias de Cúcuta 2026, sin supervisor registrado. '
          'Caracol S.A.: 200 millones (27-oct) como "apoyo a la gestión" de la Oficina de Prensa para difundir contenidos en radio. Consultores LAF: 240 millones de apoyo jurídico.'),
  criterio=('La causal de servicios profesionales y apoyo a la gestión (Decreto 1082, art. 2.2.1.2.1.4.9) se basa en la idoneidad de la persona y no aplica para operar eventos ni para pauta publicitaria. '
            'Esos objetos tienen pluralidad de oferentes y deben contratarse de forma competitiva. Que una firma externa "revise el ciclo contractual" por 1.000 millones duplica funciones de la Oficina Jurídica y de Control Interno.'),
  verificar='Pedir el certificado de idoneidad, los productos entregados y la justificación de la exclusividad en las ferias (quién recibió los ingresos de la comercialización). Pedir también las pautas emitidas por Caracol.',
  url=S + 'CO1.NTC.10610940'),

 dict(riesgo='MEDIO', tipo='Represamiento y avalancha de contratos de prestación de servicios después de la Ley de Garantías',
  entidad='Alcaldía, IMRD, Central de Transportes y Área Metropolitana', contratista='2.824 contratos de prestación de servicios', contratos='Hoja "Base de contratos" (filtrar Justificación = Servicios profesionales)', valor=34775800000,
  hechos=('Entre el 8-mar y el 21-jun-2026 (Ley de Garantías por las elecciones presidenciales) la Alcaldía firmó prácticamente 0 contratos de prestación de servicios. Del 22-jun al 4-nov firmó 2.824, por 34.776 millones: 543 en julio, 895 en agosto, 522 en septiembre y 885 en octubre. '
          'Fuera del periodo, como contexto: en enero de 2026 la Alcaldía firmó 4.129 contratos directos por 94.685 millones (en enero de 2025 fueron 270). El 30-ene, un día antes de que empezara la restricción, firmó 49 contratos por 45.083 millones. '
          '28 personas tienen 2 o más contratos de prestación de servicios vigentes al mismo tiempo, en la misma entidad o en otra (ver hoja "PS simultáneos").'),
  criterio=('La Ley de Garantías se cumplió en lo formal. Sin embargo, la concentración de la contratación justo antes y justo después de la veda, y el volumen de contratistas, sugieren una "nómina paralela" para funciones permanentes '
            '(Sentencia C-614 de 2009; Ley 2195 de 2022). Los contratos simultáneos pueden ser imposibles de cumplir en la práctica.'),
  verificar='Comparar con la planta de personal y el plan de vacantes. Revisar los informes de actividades de las personas con contratos simultáneos y si se cumplen funciones misionales permanentes.'),

 dict(riesgo='MEDIO', tipo='Debilidades de transparencia en SECOP (publicación incompleta)',
  entidad='Todas; sobre todo ESE IMSALUD y EIS Cúcuta', contratista='—', contratos='—', valor=26241800000,
  hechos=('Solo 200 de 2.992 contratos reportan pagos: 2.246 millones de 119.292 (1,9%). '
          '314 contratos, por 26.242 millones, no tienen supervisor registrado. En 28 contratos de 100 millones o más, por 19.550 millones, el supervisor es el mismo ordenador del gasto. '
          '7 contratistas plurales (uniones temporales) no tienen NIT, entre ellos UT Equipos Biomédicos ESE IMSALUD (2.232 millones) y UT Los Ángeles 2026 (1.730 millones). '
          'La ESE IMSALUD publicó solo 4 contratos en SECOP II en el periodo y la EIS Cúcuta ninguno: en 2025 publicó 2 y en 2024, 168.'),
  criterio=('Las entidades deben publicar en SECOP II la actividad contractual y su ejecución, incluidas las de régimen especial (Ley 1150, art. 3; Ley 1712 de 2014; Ley 2195 de 2022, art. 53). '
            'Que el supervisor sea el mismo ordenador del gasto elimina el control cruzado.'),
  verificar='Pedir por derecho de petición (Ley 1755 de 2015) la relación completa de contratos de IMSALUD y EIS Cúcuta de 2026. Pedir los informes de supervisión de los contratos sin supervisor.'),

 dict(riesgo='BAJO', tipo='Convenios con ESAL durante la Ley de Garantías',
  entidad='Alcaldía', contratista='Fundación Brisas del Pamplonita, Mundo Vida y Paz, Corprodinco, Crece Colombia, Corporación Mixta de Promoción, Escuela de Gestión Pública', contratos='Ver hoja "Base de contratos" (Decreto 092, mar-jun 2026)', valor=2304700000,
  hechos=('Entre el 16-mar y el 12-jun-2026 se firmaron convenios del Decreto 092 por cerca de 2.305 millones. Se tramitaron como "régimen especial con ofertas", pero en la mayoría hubo una sola oferta. '
          'Los convenios con universidades para apoyos de educación superior (BS-196) sí tuvieron 7 oferentes.'),
  criterio=('La Ley 996 de 2005, art. 33, suspende la contratación directa en el periodo preelectoral. Los convenios del Decreto 092 con proceso competitivo están permitidos, pero un proceso con un único oferente debilita esa justificación.'),
  verificar='Verificar que cada convenio haya tenido un aviso público de convocatoria con plazo razonable.'),
]

CTX = {
 0: ('RUES (datos.gov.co c82u-588k): Aventours Travel Group S.A.S. se matriculó el 05-feb-2025. José Andrés Hernández Mejía está matriculado como comerciante desde 2008, con actividad CIIU 7911 (agencias de viaje). '
     'Según SECOP, en 2026 también contrató con la Gobernación de Norte de Santander (unos $3.358 millones), el SENA ($1.539 millones) y la Policía Metropolitana ($539 millones). No se encontró información en prensa.'),
 1: ('RUES (c82u-588k): es una S.A.S. comercial con razón social "Empresa de Exposición de Cúcuta Ciudad Destino S.A.S. y con sigla World Go Colombia S.A.S.", matriculada el 18-sep-2025 con actividad CIIU 7010. En RUES no figura como EICE. '
     'En el registro de proveedores de SECOP (qmzu-gj57) aparece con "es_entidad: No", cuenta creada el 04-oct-2025 y dirección CALLE 11 No. 5-49, la misma del Palacio Municipal de Cúcuta. '
     'Además, en enero de 2026, justo antes de la Ley de Garantías, recibió otros 3 contratos interadministrativos: ANATO ($140 millones), Feria de Cúcuta ($3.192 millones) y actividades artísticas ($903 millones). En total suma unos $10.588 millones. '
     'La Opinión (28-jul-2026) informó que la Feria la organiza "la empresa Go Colombia, bajo la dirección de Ronald Panchá": https://laopinion.co/cucuta/con-la-lectura-del-bando-quedo-inaugurada-la-feria-de-cucuta-2026-que-belleza-mano'),
 2: ('RUES: es una S.A.S. matriculada el 02-ene-2025 en Bucaramanga. Su web se describe como de "naturaleza jurídica privada con funciones públicas" (https://e-desarrollo.gov.co/quienes-somos/). '
     'Metropolitano (06-sep-2026) la llamó "el contratadero": https://metropolitano.com.co/el-contratadero-el-concejal-y-un-escandalo-por-violencia-intrafamiliar/. '
     'Según ese medio, el Concejo aprobó en trámite exprés el Acuerdo 009 de 2025 que autorizó el ingreso de Cúcuta, y la composición accionaria es: Cúcuta 25,5%, El Playón 25,5%, Fomcolombia 40%, Funproin 5% y Semes 4,95%. '
     'Verificado en SECOP: en 2025 recibió de la Alcaldía de Cúcuta convenios por $93.711, $46.372, $31.710, $14.929 y $7.473 millones, y del IMRD 2 convenios de $15.402 millones. Con lo de 2026, son unos $228.000 millones desde 2025 solo con entidades de Cúcuta, todos por contratación directa.'),
 3: ('RUES: Mapper Gis Ingeniería S.A.S. se matriculó en 2018 en Bogotá. Su sitio web no menciona sede en Cúcuta y este es su único contrato registrado en SECOP. '
     'El Concejo hizo control político a la actualización catastral: https://laopinion.co/cucuta/concejo-de-cucuta-realizo-control-politico-sobre-la-actualizacion-parcial-del-catastro'),
 5: ('RUES: es una fundación (ESAL) registrada en Cúcuta desde 2016 por traslado desde otra cámara. Su representante legal es Miryam del Carmen Santiago. Su actividad principal es CIIU 8899 (asistencia social) y la secundaria, comercio al por mayor de materias primas agropecuarias. '
     'Según SECOP, contrató con Cúcuta $2.301 millones en 2024, $8.925 millones en 2025 y $6.873 millones en 2026, cifras en aumento.'),
 6: ('RUES: Fundación para el Desarrollo Global (FUNDEGLOB) se matriculó el 11-feb-2021 y su representante legal es Julio César Sánchez Peña. En 2025 ya había recibido convenios de legalización de asentamientos ($3.209 millones) y del barrio Morelli ($858 millones). '
     'CORPOCERO es una ESAL de 1990 cuyo representante legal es Franklin Toloza Yáñez. En enero de 2026 también recibió el convenio "Guardianes del espacio público" por $714 millones.'),
 7: ('RUES: la Escuela de Gestión Pública (sigla CESPRONOR) es una CORPORACIÓN privada sin ánimo de lucro, matriculada el 30-nov-2021, por lo que no es una entidad pública. Fue creada por iniciativa del entonces gobernador Silvano Serrano (https://www.laopinion.co/cucuta/gobernador-pone-en-marcha-la-escuela-de-gestion-publica) '
     'y ha recibido unos $22.695 millones de la Gobernación. '
     'La Fundación Congregar es una ESAL de 2002 y en RUES su última renovación de matrícula es de 2025.'),
 8: ('INNOVATECH E.I.C.E. es la antigua Imprenta Departamental del Valle (IMPRETICS). Tiene antecedentes en prensa como intermediaria por contratos interadministrativos: '
     'Semana la llamó "pulpo de la contratación" (https://www.semana.com/nacion/articulo/semana-destapa-la-increible-historia-de-una-sencilla-imprenta-en-cali-que-termino-convertida-en-un-pulpo-de-la-contratacion-en-el-pais-hay-corrupcion/202338/) y El Tiempo publicó otra nota (https://www.eltiempo.com/colombia/cali/imprenta-del-valle-en-una-enredijo-de-contratos-y-subcontratos-761911). '
     'RedSumma es una alianza de instituciones públicas de educación superior y figura en denuncias de 2026 sobre convenios tecnológicos en el Quindío por $101.735 millones (https://www.semana.com/nacion/armenia/articulo/convenios-por-101-mil-millones-salpicarian-a-cuatro-alcaldes-del-quindio-y-reavivan-el-fantasma-del-mayor-escandalo-de-armenia/202656/). No hay fallos.'),
 13: ('Procuraduría: hay una investigación disciplinaria contra el alcalde por presunta participación en política, que incluye la presión a contratistas y funcionarios para apoyar la campaña al Senado de su esposa (Infobae, 25-oct-2025): '
      'https://www.infobae.com/colombia/2025/10/25/procuraduria-investiga-al-alcalde-de-cucuta-por-presunta-presion-politica-a-contratistas/. '
      'Este antecedente hace aún más relevante revisar la contratación masiva de prestación de servicios.'),
}
for i, t in CTX.items():
    ALERTAS[i]['contexto'] = t

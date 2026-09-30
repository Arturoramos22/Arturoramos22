/* Prueba de competencias comportamentales – modelo de juicio situacional (caso + enunciado + 3 opciones graduadas).
   Competencias: comunes (Decreto 815 de 2018) y del nivel profesional; contextualizadas en el rol de Procurador Judicial I.
   v: 2 = conducta esperada (nivel alto), 1 = parcialmente adecuada (nivel medio), 0 = inadecuada (nivel bajo). */
window.BANCO = window.BANCO || [];
window.BANCO.push(
{ id:'B-01', eje:'COMP', tipo:'B', competencia:'Orientación a resultados',
  caso:'Faltan tres días para el vencimiento del término para presentar un concepto de fondo en un proceso complejo. El Procurador Judicial I recibe además dos citaciones a audiencias de conciliación y una solicitud urgente de información de la Procuraduría Delegada.',
  enunciado:'La conducta más acorde con la competencia de orientación a resultados es',
  opciones:[
   { t:'Priorizar las tareas según su plazo e impacto, reorganizar la agenda del despacho, delegar la preparación de insumos en el equipo de apoyo y asegurar que el concepto se radique dentro del término sin descuidar las audiencias.', v:2 },
   { t:'Concentrarse exclusivamente en el concepto y pedir a la Delegada que espere hasta la semana siguiente, sin informar la situación.', v:1 },
   { t:'Radicar un concepto general y breve para cumplir el plazo, dejando el análisis de fondo para una eventual ampliación posterior.', v:0 } ],
  explicacion:'La orientación a resultados implica cumplir con oportunidad y calidad las metas institucionales, administrando el tiempo y los recursos disponibles. La opción de nivel alto prioriza, organiza y delega sin sacrificar calidad ni comunicación; ignorar un requerimiento sin informar (nivel medio) afecta la coordinación; radicar un producto deficiente (nivel bajo) sacrifica la calidad por la forma.' },

{ id:'B-02', eje:'COMP', tipo:'B', competencia:'Orientación al usuario y al ciudadano',
  caso:'Una persona de la tercera edad, sin abogado y con dificultades para leer, acude al despacho del Procurador Judicial I para preguntar por el estado de una conciliación en la que es convocante. Está confundida y molesta porque nadie le ha explicado el trámite.',
  enunciado:'La conducta esperada del Procurador es',
  opciones:[
   { t:'Escucharla con respeto, explicarle en lenguaje claro y sencillo el estado del trámite y los pasos siguientes, verificar que comprendió y entregarle la información por escrito en formato accesible.', v:2 },
   { t:'Indicarle que consulte el estado en la página web de la Procuraduría y que regrese con un abogado.', v:0 },
   { t:'Pedir a un funcionario del despacho que le entregue copia del expediente para que lo revise en casa.', v:1 } ],
  explicacion:'La orientación al usuario y al ciudadano exige dirigir las decisiones y acciones a la satisfacción de las necesidades e intereses de los usuarios, con lenguaje claro, trato digno y atención diferencial. Remitir a la web sin considerar las barreras de la persona (nivel bajo) y entregar documentos sin explicación (nivel medio) no garantizan la comprensión.' },

{ id:'B-03', eje:'COMP', tipo:'B', competencia:'Compromiso con la organización',
  caso:'En una reunión con abogados litigantes, uno de ellos critica duramente a la Procuraduría y afirma que los procuradores judiciales “no sirven para nada” en las audiencias. Algunos colegas del Procurador Judicial I ríen y asienten.',
  enunciado:'La conducta que mejor refleja compromiso con la organización es',
  opciones:[
   { t:'Explicar con argumentos y respeto el papel constitucional del Ministerio Público en los procesos, reconocer las oportunidades de mejora y ofrecer canales institucionales para las inquietudes concretas.', v:2 },
   { t:'Guardar silencio para no generar confrontación y comentar el asunto después con los colegas.', v:1 },
   { t:'Sumarse a las críticas para ganar empatía con los litigantes y mostrar independencia frente a la entidad.', v:0 } ],
  explicacion:'El compromiso con la organización implica alinear el comportamiento con las necesidades, prioridades y metas de la entidad, y promover su imagen y misión. Defender institucionalmente el rol del Ministerio Público con argumentos, sin negar las oportunidades de mejora, es el nivel alto; el silencio es insuficiente; sumarse a la descalificación afecta la imagen institucional y la propia función.' },

{ id:'B-04', eje:'COMP', tipo:'B', competencia:'Trabajo en equipo',
  caso:'El Procurador Judicial I coordina un grupo de tres profesionales. Uno de ellos entrega sistemáticamente sus proyectos tarde, lo que obliga a los demás a asumir su carga y genera malestar.',
  enunciado:'La conducta más adecuada es',
  opciones:[
   { t:'Reunirse en privado con el profesional para identificar las causas del retraso, acordar compromisos verificables y redistribuir temporalmente las cargas con transparencia frente al equipo, haciendo seguimiento.', v:2 },
   { t:'Reasignar de forma permanente las tareas del profesional a los demás sin hablar con él, para asegurar el cumplimiento.', v:1 },
   { t:'Señalar públicamente en la reunión de equipo los incumplimientos del profesional para que “sienta la presión” de sus compañeros.', v:0 } ],
  explicacion:'El trabajo en equipo implica trabajar con otros de forma integrada y armónica para la consecución de metas comunes, resolviendo las dificultades con diálogo y corresponsabilidad. El abordaje individual y el acuerdo de compromisos es el nivel alto; la reasignación silenciosa evita el problema; la exposición pública deteriora la confianza y el clima laboral.' },

{ id:'B-05', eje:'COMP', tipo:'B', competencia:'Adaptación al cambio',
  caso:'La Procuraduría implementa un nuevo sistema de gestión documental electrónica para los expedientes de conciliación. El Procurador Judicial I y su equipo dominaban el sistema anterior y los primeros días el nuevo genera demoras.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Capacitarse y capacitar al equipo en la nueva herramienta, identificar y reportar de manera constructiva las dificultades a la dependencia responsable, y ajustar los procedimientos internos del despacho para aprovechar el sistema.', v:2 },
   { t:'Seguir usando el sistema anterior en paralelo “hasta que el nuevo funcione bien”, sin informar a nadie.', v:0 },
   { t:'Usar el nuevo sistema solo para lo estrictamente obligatorio y esperar a que otros despachos resuelvan los problemas.', v:1 } ],
  explicacion:'La adaptación al cambio supone enfrentar con flexibilidad las situaciones nuevas, asumiendo un manejo positivo y constructivo de los cambios. Apropiarse de la herramienta y contribuir a su mejora es el nivel alto; la adopción mínima es pasiva; mantener el sistema antiguo de manera informal desconoce las directrices institucionales y genera riesgos documentales.' },

{ id:'B-06', eje:'COMP', tipo:'B', competencia:'Aprendizaje continuo',
  caso:'Se expide una reforma legal que modifica sustancialmente el procedimiento en una de las materias en que interviene el Procurador Judicial I. En dos semanas tiene audiencias en las que la reforma será aplicable.',
  enunciado:'La conducta más acorde con el aprendizaje continuo es',
  opciones:[
   { t:'Estudiar el texto de la reforma y sus antecedentes, contrastarlo con la jurisprudencia disponible, participar en los espacios de capacitación institucional y compartir con el equipo una síntesis de los cambios relevantes para las audiencias.', v:2 },
   { t:'Esperar a que la Procuraduría Delegada envíe una circular con instrucciones antes de estudiar la reforma.', v:1 },
   { t:'Seguir aplicando el procedimiento anterior mientras no exista jurisprudencia consolidada sobre la reforma.', v:0 } ],
  explicacion:'El aprendizaje continuo implica mantener actualizados los conocimientos y aplicarlos al trabajo, con iniciativa propia. Estudiar la norma, contrastarla y compartir el conocimiento es el nivel alto; esperar instrucciones es reactivo; ignorar la vigencia de la ley es inadmisible en un agente del Ministerio Público.' },

{ id:'B-07', eje:'COMP', tipo:'B', competencia:'Aporte técnico-profesional',
  caso:'Un juez administrativo solicita al Procurador Judicial I concepto sobre la aprobación de una conciliación en la que la entidad acepta pagar una suma que, según los cálculos del Procurador, excede notablemente la que resultaría de una eventual condena.',
  enunciado:'La conducta que mejor refleja el aporte técnico-profesional es',
  opciones:[
   { t:'Rendir concepto motivado que exponga los cálculos, las normas y la jurisprudencia aplicables, advierta la posible lesividad para el patrimonio público y recomiende la improbación o el ajuste del acuerdo.', v:2 },
   { t:'Rendir concepto favorable a la aprobación, porque el acuerdo fue avalado por el comité de conciliación de la entidad.', v:0 },
   { t:'Rendir concepto en el que se limita a señalar que “existen dudas sobre la cuantía” sin desarrollar el análisis.', v:1 } ],
  explicacion:'El aporte técnico-profesional consiste en poner a disposición de la entidad los conocimientos y experiencia para la solución de asuntos, con rigor y fundamento. El concepto motivado con cálculos y fuentes es el nivel alto; la simple mención de dudas no aporta valor; conceptuar favorablemente por deferencia al comité desconoce el deber de defensa del patrimonio público.' },

{ id:'B-08', eje:'COMP', tipo:'B', competencia:'Comunicación efectiva',
  caso:'En una audiencia de conciliación virtual, el apoderado del convocante y el de la entidad discuten acaloradamente y se interrumpen. Las partes no entienden qué está ocurriendo.',
  enunciado:'La conducta esperada del Procurador Judicial I es',
  opciones:[
   { t:'Retomar la dirección de la audiencia, fijar reglas de intervención, resumir con claridad las posiciones de cada parte y verificar que las personas comprenden las alternativas antes de continuar.', v:2 },
   { t:'Silenciar los micrófonos de los apoderados y continuar leyendo el acta sin dar explicaciones.', v:1 },
   { t:'Suspender la audiencia y reprogramarla “cuando los abogados estén dispuestos a comportarse”.', v:0 } ],
  explicacion:'La comunicación efectiva implica establecer comunicación clara, asertiva y oportuna, escuchando y asegurándose de que el mensaje sea comprendido. Dirigir la audiencia, ordenar el debate y verificar la comprensión es el nivel alto; silenciar sin explicar es unilateral; suspender por el conflicto abandona el rol de conductor de la diligencia.' },

{ id:'B-09', eje:'COMP', tipo:'B', competencia:'Gestión de procedimientos',
  caso:'El despacho del Procurador Judicial I recibe mensualmente decenas de solicitudes de conciliación. Detecta que varias audiencias han debido reprogramarse porque las citaciones no llegaron oportunamente a las entidades convocadas.',
  enunciado:'La conducta que mejor refleja la gestión de procedimientos es',
  opciones:[
   { t:'Analizar el flujo del trámite, identificar el punto de falla en las citaciones, estandarizar un procedimiento de verificación de correos y acuses de recibo, y establecer un indicador de audiencias efectivas para hacer seguimiento.', v:2 },
   { t:'Instruir al equipo para que “tenga más cuidado” con las citaciones, sin modificar el procedimiento.', v:1 },
   { t:'Citar a todas las audiencias con el doble de anticipación, aunque ello prolongue innecesariamente los trámites y afecte el término legal de tres meses.', v:0 } ],
  explicacion:'La gestión de procedimientos implica desarrollar las tareas a cargo en el marco de los procedimientos vigentes y proponer mejoras. Diagnosticar, estandarizar y medir es el nivel alto; la exhortación genérica no corrige la causa; duplicar la anticipación sacrifica la oportunidad del servicio y puede vulnerar los términos legales.' },

{ id:'B-10', eje:'COMP', tipo:'B', competencia:'Instrumentación de decisiones',
  caso:'La Procuraduría Delegada emite una directriz para priorizar la intervención en procesos donde estén en riesgo recursos públicos superiores a determinada cuantía. El Procurador Judicial I tiene varios procesos que no cumplen ese criterio pero involucran derechos fundamentales de personas vulnerables.',
  enunciado:'La conducta más adecuada es',
  opciones:[
   { t:'Aplicar la directriz en los procesos que corresponden y, respecto de los que involucran derechos fundamentales de personas vulnerables, sustentar ante la Delegada la necesidad de intervenir con base en los criterios constitucionales del artículo 277-7, documentando la decisión.', v:2 },
   { t:'Abstenerse de intervenir en todos los procesos que no cumplan la cuantía, sin excepción.', v:1 },
   { t:'Ignorar la directriz y continuar interviniendo en todos los procesos como antes, sin informar a la Delegada.', v:0 } ],
  explicacion:'La instrumentación de decisiones consiste en decidir y desarrollar las acciones para cumplir los objetivos institucionales, coordinando con las instancias competentes. El nivel alto aplica la directriz y canaliza institucionalmente las excepciones fundadas en la Constitución; la aplicación mecánica omite el criterio de derechos fundamentales; ignorar la directriz desconoce la coordinación institucional.' },

{ id:'B-11', eje:'COMP', tipo:'B', competencia:'Orientación a resultados',
  caso:'Al finalizar el trimestre, el Procurador Judicial I advierte que el despacho no alcanzará la meta de conceptos de fondo fijada en el plan de acción, en parte por un aumento imprevisto de solicitudes de conciliación.',
  enunciado:'La conducta más acorde con la orientación a resultados es',
  opciones:[
   { t:'Informar oportunamente a la Procuraduría Delegada la desviación y sus causas, proponer un plan de recuperación con acciones concretas y ajustar la distribución interna del trabajo para cumplir en el siguiente período.', v:2 },
   { t:'Registrar como “conceptos de fondo” documentos de mero trámite para alcanzar la meta numérica.', v:0 },
   { t:'Esperar a la evaluación anual para explicar el incumplimiento, confiando en que la meta se compense con otros indicadores.', v:1 } ],
  explicacion:'La orientación a resultados exige asumir la responsabilidad por los resultados, informar las desviaciones y proponer soluciones. Reportar a tiempo y proponer un plan es el nivel alto; posponer la explicación es pasivo; alterar el registro de la gestión es una conducta contraria a la integridad y potencialmente disciplinable.' },

{ id:'B-12', eje:'COMP', tipo:'B', competencia:'Orientación al usuario y al ciudadano',
  caso:'Una entidad convocada a conciliación pide al Procurador Judicial I reprogramar por tercera vez la audiencia, alegando que el comité de conciliación aún no se ha reunido. El convocante, que viaja desde otro municipio, ya asistió dos veces.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Realizar la audiencia en la fecha programada, dejar constancia de la conducta de la entidad, expedir la constancia que corresponda si no hay ánimo conciliatorio y orientar al convocante sobre sus alternativas, evitando dilaciones que le generen cargas desproporcionadas.', v:2 },
   { t:'Reprogramar la audiencia una vez más, porque la entidad es la que decide si concilia.', v:1 },
   { t:'Reprogramar y sugerir al convocante que “se ahorre el viaje” y no asista a la próxima audiencia hasta que la entidad esté lista.', v:0 } ],
  explicacion:'La orientación al ciudadano exige considerar el impacto de las decisiones en las personas y garantizar la oportunidad del servicio. El nivel alto protege al convocante y aplica las consecuencias legales de la inasistencia o falta de ánimo conciliatorio; ceder indefinidamente a la entidad traslada la carga al ciudadano; sugerir que no asista es contrario al deber de garantizar el trámite.' },

{ id:'B-13', eje:'COMP', tipo:'B', competencia:'Compromiso con la organización',
  caso:'Un contratista de una entidad demandada ofrece al Procurador Judicial I “una asesoría bien remunerada” para un asunto privado, sin relación aparente con el proceso en curso en el que el Procurador interviene.',
  enunciado:'La conducta que corresponde es',
  opciones:[
   { t:'Rechazar el ofrecimiento de manera inequívoca, dejar constancia del hecho y ponerlo en conocimiento de su superior y de la autoridad competente, evaluando si debe declararse impedido en el proceso.', v:2 },
   { t:'Rechazar el ofrecimiento verbalmente sin dejar constancia ni informar a nadie, para no “agrandar” el asunto.', v:1 },
   { t:'Aceptar la asesoría, dado que se trata de un asunto privado ajeno al proceso y fuera del horario laboral.', v:0 } ],
  explicacion:'El compromiso con la organización y la integridad exigen anteponer los intereses institucionales y actuar con transparencia. Rechazar, documentar e informar es el nivel alto; rechazar sin reportar deja sin trazabilidad un posible intento de influencia indebida; aceptar vulnera la prohibición de ejercer la profesión y configura conflicto de intereses.' },

{ id:'B-14', eje:'COMP', tipo:'B', competencia:'Trabajo en equipo',
  caso:'Un colega Procurador Judicial de otra materia solicita apoyo urgente para cubrir una audiencia porque está incapacitado. El Procurador Judicial I tiene agenda ocupada pero podría reorganizarla.',
  enunciado:'La conducta más adecuada es',
  opciones:[
   { t:'Verificar con la Procuraduría Delegada la viabilidad y competencia para la sustitución, reorganizar su agenda y prepararse con la información del caso para atender la audiencia adecuadamente.', v:2 },
   { t:'Negarse, argumentando que cada procurador es responsable exclusivo de sus despachos asignados.', v:0 },
   { t:'Aceptar cubrir la audiencia sin consultar a la Delegada ni revisar el expediente, para no perder tiempo.', v:1 } ],
  explicacion:'El trabajo en equipo implica cooperar con otras dependencias para el logro de los objetivos institucionales, dentro de los canales de coordinación. Apoyar con verificación de competencia y preparación es el nivel alto; apoyar sin preparación ni coordinación puede afectar la calidad de la intervención; negarse sin evaluar alternativas es contrario a la colaboración institucional.' },

{ id:'B-15', eje:'COMP', tipo:'B', competencia:'Adaptación al cambio',
  caso:'Por reorganización interna, el Procurador Judicial I es reasignado de la materia administrativa, en la que tiene amplia experiencia, a la materia de familia, que no ha ejercido en años.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Asumir la nueva asignación con actitud constructiva, elaborar un plan de actualización en la materia, apoyarse en colegas expertos y en la capacitación institucional, y organizar el despacho para garantizar la calidad de la intervención desde el inicio.', v:2 },
   { t:'Solicitar de inmediato la revocatoria de la reasignación y, mientras se decide, atender la nueva materia con el mínimo esfuerzo.', v:0 },
   { t:'Aceptar la reasignación y aprender “sobre la marcha” en las audiencias, sin plan de actualización.', v:1 } ],
  explicacion:'La adaptación al cambio supone aceptar y promover los cambios organizacionales manteniendo la eficiencia. El nivel alto combina actitud positiva con un plan concreto de actualización; aprender sin plan expone la calidad de la intervención; oponerse y bajar el desempeño afecta el servicio y la organización.' },

{ id:'B-16', eje:'COMP', tipo:'B', competencia:'Aprendizaje continuo',
  caso:'En una audiencia, el juez le señala al Procurador Judicial I que la jurisprudencia que citó fue modificada por una sentencia de unificación reciente.',
  enunciado:'La conducta más adecuada es',
  opciones:[
   { t:'Reconocer el punto, solicitar la oportunidad para ajustar el concepto, estudiar la nueva sentencia y actualizar las fichas jurisprudenciales del despacho para evitar que se repita.', v:2 },
   { t:'Insistir en la tesis anterior, argumentando que la sentencia de unificación aún es “muy reciente” para aplicarse.', v:0 },
   { t:'Reconocer el punto y retirar el argumento, sin revisar después la sentencia ni actualizar el material del despacho.', v:1 } ],
  explicacion:'El aprendizaje continuo implica reconocer las propias limitaciones y actualizarse permanentemente, incorporando lo aprendido al trabajo. Ajustar, estudiar y actualizar el material del despacho es el nivel alto; reconocer sin actualizar no evita el error futuro; insistir en un precedente superado afecta la credibilidad técnica del Ministerio Público.' },

{ id:'B-17', eje:'COMP', tipo:'B', competencia:'Aporte técnico-profesional',
  caso:'Un juez penal municipal, recién nombrado, consulta informalmente al Procurador Judicial I sobre cómo debe resolver una solicitud de la Fiscalía en una audiencia en la que el Procurador interviene.',
  enunciado:'La conducta correcta es',
  opciones:[
   { t:'Explicar que su rol es intervenir en la audiencia y no asesorar al juez, y ofrecer que en la diligencia expondrá de manera fundada la posición del Ministerio Público sobre la solicitud, con las normas y jurisprudencia pertinentes.', v:2 },
   { t:'Asesorar al juez en privado sobre el sentido de la decisión, para agilizar la audiencia.', v:0 },
   { t:'Responder al juez que no puede ayudarlo y abstenerse de pronunciarse sobre el asunto en la audiencia.', v:1 } ],
  explicacion:'El aporte técnico-profesional debe ejercerse dentro de los cauces del rol institucional: el Procurador aporta su conocimiento a través de su intervención en la audiencia, no como asesor privado del juez, lo que comprometería la imparcialidad de ambos. Negarse a pronunciarse en audiencia omite el aporte debido.' },

{ id:'B-18', eje:'COMP', tipo:'B', competencia:'Comunicación efectiva',
  caso:'El Procurador Judicial I debe informar por escrito a una comunidad campesina el resultado de una intervención ambiental que no les fue favorable.',
  enunciado:'La conducta que mejor refleja la comunicación efectiva es',
  opciones:[
   { t:'Redactar la comunicación en lenguaje claro, explicar las razones de la decisión y las alternativas disponibles, y ofrecer un espacio presencial o virtual para atender preguntas de la comunidad.', v:2 },
   { t:'Remitir copia de la providencia judicial sin explicación adicional, pues el texto es autoexplicativo para cualquier lector.', v:0 },
   { t:'Enviar una comunicación breve que indique el resultado y sugiera consultar a un abogado para entender los detalles.', v:1 } ],
  explicacion:'La comunicación efectiva exige adaptar el mensaje al destinatario, con claridad y apertura al diálogo. Explicar razones y alternativas y ofrecer un espacio de preguntas es el nivel alto; remitir a un abogado traslada la carga a la comunidad; enviar la providencia sin explicación desconoce las barreras del lenguaje jurídico.' },

{ id:'B-19', eje:'COMP', tipo:'B', competencia:'Gestión de procedimientos',
  caso:'El Procurador Judicial I recibe una solicitud de conciliación que no cumple varios requisitos formales (falta la copia de la petición previa y la estimación razonada de la cuantía).',
  enunciado:'La conducta procedente es',
  opciones:[
   { t:'Requerir al solicitante, de conformidad con el procedimiento legal, para que subsane las falencias dentro del término previsto, indicándole con precisión qué debe aportar y las consecuencias de no hacerlo.', v:2 },
   { t:'Rechazar de plano la solicitud sin indicar los requisitos incumplidos, para descongestionar el despacho.', v:0 },
   { t:'Admitir la solicitud y citar a audiencia, esperando que el solicitante complete los documentos en la diligencia.', v:1 } ],
  explicacion:'La gestión de procedimientos implica aplicar correctamente las reglas del trámite, garantizando el debido proceso administrativo. El requerimiento claro para subsanar es el nivel alto; admitir sin requisitos genera audiencias fallidas y desgaste; rechazar sin motivar vulnera el derecho del ciudadano a conocer las razones y a corregir.' },

{ id:'B-20', eje:'COMP', tipo:'B', competencia:'Instrumentación de decisiones',
  caso:'Durante una audiencia de conciliación, las partes proponen un acuerdo que, en criterio del Procurador Judicial I, es claramente lesivo para el patrimonio público y contrario a la ley.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Explicar a las partes, con fundamento normativo, las razones por las cuales el acuerdo no es viable, proponer alternativas ajustadas a derecho si existen y, de insistir las partes, dejar constancia motivada de su posición para conocimiento del juez que deba aprobarlo.', v:2 },
   { t:'Consignar el acuerdo tal como lo proponen las partes, pues son ellas quienes disponen del asunto y el juez decidirá.', v:0 },
   { t:'Negarse a levantar el acta y dar por terminada la audiencia sin explicaciones.', v:1 } ],
  explicacion:'La instrumentación de decisiones supone tomar decisiones fundamentadas dentro de las competencias propias y ejecutarlas con rigor. El Procurador tiene el deber de velar por que la conciliación no sea lesiva ni ilegal; explicar, proponer alternativas y dejar constancia es el nivel alto; terminar sin explicar frustra el servicio; consignar pasivamente un acuerdo ilegal incumple su función.' },

{ id:'B-21', eje:'COMP', tipo:'B', competencia:'Toma de decisiones',
  caso:'En audiencia de control de garantías, el fiscal solicita una medida de aseguramiento con fundamento en elementos que, a juicio del Procurador Judicial I, son insuficientes. El juez le concede la palabra.',
  enunciado:'La conducta más adecuada es',
  opciones:[
   { t:'Exponer con claridad y fundamento su posición sobre la insuficiencia de los elementos y la falta de acreditación de los fines constitucionales de la medida, aun cuando sea impopular frente a la expectativa social del caso.', v:2 },
   { t:'Manifestar que se atiene a lo que decida el juez, para no asumir una posición controversial.', v:1 },
   { t:'Coadyuvar la solicitud del fiscal porque el delito es de alto impacto social y la comunidad espera la detención.', v:0 } ],
  explicacion:'La toma de decisiones implica elegir con oportunidad, entre alternativas, la más fundada, asumiendo la responsabilidad. El Procurador es garante de los derechos fundamentales y del debido proceso; su posición debe fundarse en la ley y las pruebas, no en la presión social. Abstenerse de decidir es insuficiente; coadyuvar sin fundamento desnaturaliza su rol.' },

{ id:'B-22', eje:'COMP', tipo:'B', competencia:'Dirección y desarrollo de personal',
  caso:'Un profesional nuevo del despacho del Procurador Judicial I cometió un error en el cálculo de la caducidad en un proyecto de concepto, error que el Procurador detectó antes de firmar.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Corregir el concepto, explicar al profesional el error y la forma correcta de contar el término con ejemplos, y establecer una lista de verificación para los próximos proyectos, valorando su disposición a aprender.', v:2 },
   { t:'Corregir el concepto en silencio y asumir personalmente todos los cálculos de caducidad en adelante.', v:1 },
   { t:'Devolver el proyecto con la anotación “esto está mal, revise” y advertir que un nuevo error afectará su evaluación.', v:0 } ],
  explicacion:'La dirección y desarrollo de personal implica favorecer el aprendizaje y desarrollo de los colaboradores mediante retroalimentación oportuna y constructiva. Explicar, enseñar y establecer controles es el nivel alto; asumir la tarea impide el desarrollo del colaborador; la retroalimentación vaga y amenazante no forma y deteriora el clima.' },

{ id:'B-23', eje:'COMP', tipo:'B', competencia:'Orientación a resultados',
  caso:'El Procurador Judicial I identifica que un número importante de solicitudes de conciliación que llegan a su despacho corresponden a un mismo tipo de reclamación contra una entidad, originada en una práctica administrativa irregular reiterada.',
  enunciado:'La conducta que agrega mayor valor institucional es',
  opciones:[
   { t:'Además de tramitar cada solicitud, documentar el patrón y promover, por los canales institucionales, una actuación preventiva ante la entidad para corregir la práctica y evitar la reiteración del daño antijurídico.', v:2 },
   { t:'Tramitar cada solicitud individualmente con la mayor celeridad posible, sin abordar la causa.', v:1 },
   { t:'Devolver las solicitudes a los convocantes sugiriendo que presenten una acción de grupo.', v:0 } ],
  explicacion:'La orientación a resultados en el sector público incluye generar valor con impacto institucional: identificar causas y promover soluciones estructurales. Tramitar y a la vez activar la función preventiva es el nivel alto; la tramitación aislada resuelve casos pero no la causa; devolver las solicitudes desconoce el derecho de los ciudadanos al trámite.' },

{ id:'B-24', eje:'COMP', tipo:'B', competencia:'Orientación al usuario y al ciudadano',
  caso:'Una persona con discapacidad auditiva solicita ser oída en una audiencia de conciliación que preside el Procurador Judicial I. No hay intérprete de lengua de señas disponible en la sede.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Gestionar con anticipación, a través de los canales institucionales, un intérprete o medios tecnológicos de accesibilidad y, si es necesario, reprogramar brevemente la diligencia para garantizar la participación efectiva de la persona.', v:2 },
   { t:'Realizar la audiencia con el apoderado de la persona y prescindir de su participación directa.', v:1 },
   { t:'Pedir a la persona que lleve a un familiar que “le traduzca” para no retrasar la audiencia.', v:0 } ],
  explicacion:'La orientación al ciudadano con enfoque diferencial exige remover barreras y garantizar la participación de las personas con discapacidad mediante ajustes razonables (Ley 1618 de 2013). Gestionar intérprete o medios accesibles es el nivel alto; prescindir de la persona vulnera su derecho a ser oída; trasladar la carga a un familiar no garantiza fidelidad ni dignidad.' },

{ id:'B-25', eje:'COMP', tipo:'B', competencia:'Compromiso con la organización',
  caso:'El Procurador Judicial I recibe una invitación de un medio de comunicación para opinar sobre un proceso judicial de alto perfil en el que interviene otra procuraduría judicial.',
  enunciado:'La conducta correcta es',
  opciones:[
   { t:'Declinar pronunciarse sobre el caso concreto, explicar que la vocería institucional corresponde a los canales oficiales de la entidad y remitir la solicitud a la oficina de comunicaciones.', v:2 },
   { t:'Opinar a título personal, aclarando que no habla en nombre de la Procuraduría.', v:0 },
   { t:'Declinar la entrevista sin dar explicación ni remitirla a los canales institucionales.', v:1 } ],
  explicacion:'El compromiso con la organización implica respetar la vocería institucional y la reserva de las actuaciones, evitando afectar la imparcialidad y la imagen de la entidad. Declinar y canalizar la solicitud es el nivel alto; declinar sin canalizar pierde la oportunidad de una respuesta institucional; opinar “a título personal” sobre un proceso en curso compromete a la entidad y puede constituir falta.' },

{ id:'B-26', eje:'COMP', tipo:'B', competencia:'Trabajo en equipo',
  caso:'El Procurador Judicial I y su equipo deben preparar en poco tiempo la intervención en un proceso de gran complejidad técnica que involucra temas contables ajenos a su formación.',
  enunciado:'La conducta más adecuada es',
  opciones:[
   { t:'Distribuir el trabajo según las fortalezas de cada integrante, solicitar apoyo técnico a la dependencia competente de la entidad y programar sesiones de integración de los aportes para construir una posición coherente.', v:2 },
   { t:'Asumir personalmente todo el análisis para asegurar la coherencia, dejando al equipo tareas de mero trámite.', v:1 },
   { t:'Limitar la intervención a los aspectos jurídicos formales y omitir el análisis técnico por no ser de su especialidad.', v:0 } ],
  explicacion:'El trabajo en equipo implica aprovechar las capacidades de todos y articular apoyos interdisciplinarios para lograr un resultado de calidad. Distribuir, pedir apoyo técnico e integrar es el nivel alto; centralizar el análisis subutiliza al equipo; omitir el análisis técnico debilita la intervención en defensa del patrimonio público.' },

{ id:'B-27', eje:'COMP', tipo:'B', competencia:'Adaptación al cambio',
  caso:'Una decisión judicial de unificación cambia la interpretación que el Procurador Judicial I había sostenido durante años en sus conceptos sobre un tema recurrente.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Estudiar la decisión, ajustar la línea de intervención del despacho a la nueva regla jurisprudencial y explicar el cambio a las partes en los procesos en curso, con la carga argumentativa correspondiente.', v:2 },
   { t:'Mantener la tesis anterior en los conceptos hasta que exista una segunda decisión que confirme el cambio.', v:0 },
   { t:'Ajustar la tesis en los nuevos procesos, pero mantener la anterior en los que ya tienen concepto rendido, sin explicar la diferencia.', v:1 } ],
  explicacion:'La adaptación al cambio incluye ajustar el criterio propio frente a cambios normativos y jurisprudenciales, con coherencia y transparencia. Ajustar la línea y explicarlo es el nivel alto; la incoherencia entre procesos afecta la igualdad y la seguridad jurídica; desconocer el precedente vigente es contrario al deber de aplicarlo.' },

{ id:'B-28', eje:'COMP', tipo:'B', competencia:'Comunicación efectiva',
  caso:'Un funcionario del despacho informa al Procurador Judicial I que cometió un error al notificar una citación y que la audiencia programada para el día siguiente probablemente fracase.',
  enunciado:'La conducta que mejor refleja la competencia es',
  opciones:[
   { t:'Agradecer que informara a tiempo, analizar conjuntamente las alternativas para subsanar la notificación o reprogramar con la menor afectación a las partes, y comunicar de inmediato a los interesados la situación con transparencia.', v:2 },
   { t:'Reprender al funcionario frente a sus compañeros y ordenarle que “arregle el problema” sin orientación.', v:0 },
   { t:'Resolver el problema personalmente sin comentar nada al funcionario, para evitar tensiones.', v:1 } ],
  explicacion:'La comunicación efectiva incluye escuchar, dar retroalimentación oportuna y respetuosa y comunicar con transparencia a los afectados. Valorar la alerta temprana, resolver conjuntamente e informar a las partes es el nivel alto; resolver en silencio pierde la oportunidad de aprendizaje; la reprensión pública inhibe futuras alertas y deteriora el clima.' },

{ id:'B-29', eje:'COMP', tipo:'B', competencia:'Gestión de procedimientos',
  caso:'El Procurador Judicial I advierte que un procedimiento interno del despacho para el reparto de solicitudes genera demoras y no está documentado; cada funcionario lo aplica de manera distinta.',
  enunciado:'La conducta esperada es',
  opciones:[
   { t:'Documentar el procedimiento con el equipo, definir responsables, tiempos y controles, alinearlo con el sistema de gestión de la entidad y revisar periódicamente su funcionamiento.', v:2 },
   { t:'Asignar personalmente cada solicitud según su criterio, sin documentar el procedimiento.', v:1 },
   { t:'Dejar que cada funcionario continúe aplicando su propio método, pues la flexibilidad permite adaptarse a cada caso.', v:0 } ],
  explicacion:'La gestión de procedimientos implica estandarizar, documentar y mejorar los procedimientos, alineándolos con el sistema de gestión institucional (MIPG). Documentar con controles y revisión es el nivel alto; la asignación personal sin documentar depende de una sola persona; la informalidad genera inconsistencia y riesgos.' },

{ id:'B-30', eje:'COMP', tipo:'B', competencia:'Toma de decisiones',
  caso:'El Procurador Judicial I debe decidir si interviene en un proceso civil que involucra a una persona en situación de vulnerabilidad, con un plazo muy corto y sin poder consultar a la Procuraduría Delegada, que no responde.',
  enunciado:'La conducta más adecuada es',
  opciones:[
   { t:'Decidir con base en los criterios constitucionales de intervención (defensa de derechos fundamentales), documentar las razones de su decisión, intervenir oportunamente e informar a la Delegada a la mayor brevedad.', v:2 },
   { t:'Abstenerse de intervenir hasta obtener respuesta de la Delegada, aunque venza el término.', v:0 },
   { t:'Intervenir de manera genérica, sin analizar el caso, para “cubrir” el plazo mientras llega la respuesta.', v:1 } ],
  explicacion:'La toma de decisiones exige decidir con oportunidad y fundamento cuando la situación lo requiere, dentro de las competencias propias, asumiendo la responsabilidad e informando a las instancias pertinentes. Decidir con criterios constitucionales, documentar e informar es el nivel alto; intervenir sin análisis reduce la calidad; dejar vencer el término por esperar autorización desprotege al ciudadano.' }
);

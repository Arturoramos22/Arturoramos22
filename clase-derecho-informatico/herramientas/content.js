// Contenido variable de la clase (lectura, sentencia, video). Se completa tras la verificación.
module.exports = {
  lectura: {
    titulo: "Derecho Informático (Serie Materiales Docentes n.º 31). Lección introductoria: de la informática jurídica a la inteligencia artificial aplicada al derecho; ¿derecho informático o derecho digital?; características del derecho informático",
    autor: "Lorena Donoso Abarca y Carlos Reusser Monsálvez (Universidad de Chile; doctores en Derecho por la Universidad de Salamanca)",
    fuente: "Academia Judicial de Chile, Santiago, 2021 (PDF en línea desde marzo de 2022). Complemento colombiano: Flórez Rojas, M. L. (coord.), Derecho de las tecnologías y las tecnologías para el derecho, GECTI, Ediciones Uniandes, 2022: Presentación (pp. xi-xiv) y «El papel de la academia» (pp. 44-53)",
    url: "https://academiajudicial.cl/wp-content/uploads/2022/03/Derecho-informatico.pdf",
    urlComplemento: "https://ediciones.uniandes.edu.co/library/publication/derecho-de-las-tecnologias-y-las-tecnologias-para-el-derecho",
    ideas: [
      "El derecho informático nace de la informática jurídica y se separa de ella: una usa la tecnología como herramienta del jurista; la otra la convierte en objeto de regulación, hasta llegar hoy a la IA aplicada al derecho.",
      "La disciplina se construye desde principios y estándares (neutralidad tecnológica, mínima intervención del sistema normativo), no desde leyes puntuales que envejecen con la técnica.",
      "El nombre está en disputa (¿derecho informático o derecho digital?), pero sus características y campos son estables; en Colombia el GECTI ya los había trazado en 2002 (Flórez Rojas, pp. xi-xii)."
    ],
    pregunta: "¿Es el Derecho Informático una rama autónoma o un método transversal? Responda con los criterios del texto y con un ejemplo colombiano."
  },
  video: {
    titulo: "Espresso Digital, capítulo 2: La decisión de la Corte Constitucional sobre IA y su uso en la administración de justicia (fragmento de 12 a 15 minutos)",
    canal: "Consejo Superior de la Judicatura, Rama Judicial (YouTube y Spotify)",
    experto: "Magistrado Juan Carlos Cortés González, ponente de la T-323 de 2024, en conversación con la magistrada Diana Alexandra Remolina Botía y Ulises Canosa (ICDP)",
    fecha: "9 de septiembre de 2024 según la Rama Judicial (fecha y duración por confirmar en YouTube)",
    duracion: "fragmento de máximo 15 min",
    url: "https://youtu.be/c4UEAZcz4Qc",
    preguntas: [
      "¿Qué labores judiciales dice el ponente que la IA puede apoyar y cuáles son indelegables? Compárelo con los doce criterios de la sentencia.",
      "Según lo que escuchó, ¿qué debió hacer distinto el juez de Cartagena para cumplir con la transparencia y la responsabilidad?",
      "Si usted fuera apoderado de la parte vencida, ¿qué argumento construiría a partir del uso de la IA en la sentencia de segunda instancia?"
    ]
  },
  sentencia: {
    id: "Sentencia T-323 de 2024",
    corte: "Corte Constitucional, Sala Segunda de Revisión",
    mp: "M.P. Juan Carlos Cortés González",
    fecha: "2 de agosto de 2024",
    expediente: "Expediente T-9.301.656",
    hechos: [
      "Una madre, en representación de su hijo con trastorno del espectro autista, presenta tutela contra su EPS: pide exoneración de copagos y cuotas moderadoras, transporte para terapias y controles, y tratamiento integral.",
      "El 7 de diciembre de 2022 un juzgado municipal de Cartagena concede el amparo. La EPS impugna.",
      "El 30 de enero de 2023 el Juzgado Primero Laboral del Circuito de Cartagena confirma la decisión y, para \"ampliar los argumentos de la decisión adoptada\", transcribe las preguntas que formuló a ChatGPT 3.5 y sus respuestas.",
      "La Corte selecciona el caso para revisión: examina tanto la protección del niño como el uso de la IA por el juez."
    ],
    problemas: [
      "¿Se vulneró el debido proceso en la decisión de segunda instancia porque el juez usó ChatGPT 3.5? La Corte lo formula así: surgen dudas sobre (i) si quien emitió la decisión fue un juez de la República o una IA y (ii) si la decisión fue debidamente motivada o fue producto de respuestas o alucinaciones generadas por la IA.",
      "¿Vulneró la EPS los derechos a la salud, a la vida digna y a la seguridad social del niño al no exonerarlo de copagos y cuotas moderadoras, negar el transporte por falta de orden médica y no autorizar el tratamiento integral?"
    ],
    decision: [
      "Confirma parcialmente la sentencia de segunda instancia: mantiene el amparo y lo amplía al transporte para valoraciones, controles y ayudas diagnósticas, que las instancias habían dejado por fuera.",
      "Concluye que el uso de ChatGPT no comportó una usurpación de la función de administrar justicia, porque el juez ya había fundamentado y adoptado la decisión; no hubo violación del debido proceso ni causal de nulidad.",
      "Encuentra, sin embargo, que no se cumplieron a cabalidad la transparencia (la exposición del uso fue parcial) ni la responsabilidad (se incorporaron datos de la IA no del todo precisos); la privacidad sí se garantizó.",
      "Ordena al Consejo Superior de la Judicatura divulgar en cuatro meses una guía o lineamiento sobre IA generativa en la Rama Judicial y, a través de la Escuela Judicial Rodrigo Lara Bonilla, difundir la sentencia y capacitar a los funcionarios; exhorta a los jueces a evaluar el uso adecuado de estas herramientas."
    ],
    ratio: "El juez natural tiene que ser un ser humano: la IA no puede sustituirlo en las labores que exigen razonamiento lógico y humano (interpretar hechos, valorar pruebas, motivar y decidir). Su uso es admisible, de manera razonable y ponderada, bajo las cargas de transparencia, responsabilidad y protección de datos personales, y con el requisito esencial de no sustituir la racionalidad humana.",
    criterios: [
      "Transparencia", "Responsabilidad", "Privacidad", "No sustitución de la racionalidad humana",
      "Seriedad y verificación", "Prevención de riesgos", "Igualdad y equidad", "Control humano",
      "Regulación ética", "Adecuación a buenas prácticas y estándares colectivos", "Seguimiento continuo y adaptación", "Idoneidad"
    ],
    regla: "Un funcionario judicial puede usar IA generativa como apoyo (gestión administrativa y documental, corrección y resumen de textos) siempre que (i) no le delegue la interpretación de los hechos, la valoración de las pruebas, la motivación ni la decisión; (ii) evidencie con claridad el uso, su alcance y su ubicación en la providencia; (iii) verifique con rigor las fuentes y los datos y proteja la reserva de la información del proceso; y (iv) responda por el resultado. Una decisión adoptada por la IA sin valoración del juez es inválida y viola el debido proceso.",
    decisionCorta: [
      "Confirma parcialmente la segunda instancia: mantiene el amparo y lo extiende al transporte para controles y ayudas diagnósticas.",
      "El uso de ChatGPT no usurpó la función judicial: el juez ya había decidido; no hubo violación del debido proceso ni nulidad.",
      "Pero no se cumplieron a cabalidad la transparencia ni la responsabilidad; la privacidad sí se garantizó.",
      "Ordena al Consejo Superior de la Judicatura expedir lineamientos en cuatro meses y a la Escuela Judicial divulgar y capacitar; exhorta a los jueces."
    ],
    ratioCorta: "El juez natural es un ser humano: la IA no puede sustituirlo en interpretar hechos, valorar pruebas, motivar y decidir. Su uso es admisible, razonable y ponderado, bajo cargas de transparencia, responsabilidad y protección de datos, sin sustituir la racionalidad humana.",
    reglaCorta: "El juez puede usar IA generativa como apoyo (gestión, corrección y resumen de textos) si no le delega hechos, pruebas, motivación ni decisión; evidencia el uso y su alcance en la providencia; verifica fuentes y protege los datos; y responde por el resultado. La decisión tomada por la IA sin valoración del juez es inválida.",
    precedenteCorto: "Primera alta corte colombiana que condiciona el uso de IA generativa en la decisión judicial. Origen del ABC (Circular PCSJC24-37 de 2024) y de los lineamientos de la Rama (dic. 2024); estándar aplicado en la STC17832-2025.",
    precedente: "Primer pronunciamiento de una alta corte colombiana que fija condiciones para el uso de IA generativa en la decisión judicial. Dio origen al ABC de la sentencia (Circular PCSJC24-37 de 2024) y a los lineamientos de uso de IA de la Rama Judicial (diciembre de 2024), y es el estándar con el que la Corte Suprema evaluó en la STC17832-2025 una providencia fundada en citas inexistentes."
  }
};

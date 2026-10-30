import { 
  SenaSymbol, 
  SenaRight, 
  SenaDuty, 
  ProductiveModalities, 
  CaseDilemma, 
  Question,
  ApprenticeProfile,
  RegulationDefinition,
  LifecycleStage,
  DisciplinaryMeasure
} from '../types/induction';

export const SENA_INSTITUTIONAL_INFO = {
  name: "Servicio Nacional de Aprendizaje - SENA",
  founder: "Rodolfo Martínez Tono",
  foundationDate: "21 de junio de 1957",
  decree: "Decreto Ley 118 de 1957",
  motto: "El SENA es Colombia: Conocimiento y Emprendimiento para todos",
  mission: "El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.",
  vision: "En el año 2026, el SENA se consolidará como una entidad referente nacional e internacional en formación técnica y tecnológica con innovación, pertinencia, inclusión social, articulación con el sector productivo y transformación digital sostenible.",
  values: [
    { title: "Honestidad", desc: "Actuar con transparencia, rectitud y apego a la verdad en todos los actos formativos y personales." },
    { title: "Respeto", desc: "Reconocer, valorar y tratar de manera digna a todas las personas y a la comunidad educativa." },
    { title: "Compromiso", desc: "Asumir con proactividad y entrega los deberes como aprendiz y futuro trabajador de Colombia." },
    { title: "Diligencia", desc: "Cumplir con los deberes, funciones y actividades de manera oportuna, eficaz y con vocación de servicio." },
    { title: "Justicia", desc: "Actuar con equidad e imparcialidad garantizando los derechos de toda la comunidad SENA." },
    { title: "Solidaridad", desc: "Colaborar mutuamente en los ambientes de formación y con las comunidades más vulnerables." }
  ],
  hymn: {
    chorus: "Estudiantes del SENA adelante / por Colombia luchad con amor / con el ánimo noble y radiante / transformemos el mundo en mejor.",
    stanzas: [
      {
        number: 1,
        text: "De la patria el futuro destino / en las manos del joven está / el trabajo es seguro camino / que el progreso a Colombia dará."
      },
      {
        number: 2,
        text: "En la forja del SENA se forman / hombres libres de noble valor / con destreza y con ciencia transforman / el trabajo en tributo de honor."
      },
      {
        number: 3,
        text: "Hoy la patria nos llama a la lidia / de la paz, la justicia y la fe / con tesón desterremos la envidia / y en unión construiremos el bien."
      },
      {
        number: 4,
        text: "Avanzad con la antorcha encendida / del saber que ilumina el taller / que el trabajo enaltece la vida / y la dicha nos hace tener."
      }
    ]
  }
};

export const SENA_SYMBOLS: SenaSymbol[] = [
  {
    id: "escudo",
    title: "El Escudo SENA",
    subtitle: "Representación de los tres sectores de la economía colombiana",
    description: "Diseñado en los orígenes de la institución, sintetiza los sectores productivos que impulsan el desarrollo del país mediante tres elementos emblemáticos.",
    meaning: "El piñón representa la industria y el desarrollo tecnológico (sector secundario); el caduceo con hojas de café simboliza el campo y el sector agropecuario (sector primario); y el triángulo con engranaje central refleja el comercio y los servicios (sector terciario).",
    details: [
      "Sector Primario: Caduceo y elementos agrícolas.",
      "Sector Secundario: Rueda dentada y piñón industrial.",
      "Sector Terciario: Servicios, banca y comercio organizado.",
      "Vínculo con el trabajo productivo y la soberanía nacional."
    ],
    iconName: "Shield"
  },
  {
    id: "bandera",
    title: "La Bandera Institucional",
    subtitle: "Símbolo de paz, esperanza y compromiso social",
    description: "Consta de un lienzo blanco rectangular con el escudo institucional del SENA en el centro y franjas verdes que delimitan la identidad corporativa.",
    meaning: "El color blanco significa la paz, la tranquilidad y la transparencia en la gestión educativa. El color verde institucional representa la esperanza en las juventudes y el florecimiento del trabajo digno en cada rincón de Colombia.",
    details: [
      "Fondo blanco: Pureza de principios, concordia y paz.",
      "Verde SENA: Esperanza, progreso agrícola y sostenibilidad ambiental.",
      "Escudo en el centro como eje de formación profesional integral.",
      "Presente en todos los centros de formación y actos protocolarios."
    ],
    iconName: "Flag"
  },
  {
    id: "logosimbolo",
    title: "El Logo-Símbolo",
    subtitle: "El ser humano proyectándose hacia el futuro",
    description: "Representa de manera moderna y estilizada la esencia del aprendiz SENA en su proceso de transformación y superación continua.",
    meaning: "La silueta humana que avanza hacia adelante sobre un sendero con círculos concéntricos simboliza al aprendiz que emprende su proyecto de vida, adquiere competencias y supera etapas formativas con el apoyo del Estado.",
    details: [
      "La figura humana: Centro de la formación profesional integral.",
      "Los senderos y círculos: Etapas de crecimiento, conocimiento y tecnología.",
      "Dirección hacia adelante: Liderazgo, innovación y futuro laboral.",
      "Color verde institucional: Identidad nacional inconfundible."
    ],
    iconName: "Compass"
  }
];

export const SENA_RIGHTS: SenaRight[] = [
  {
    id: "der-1",
    article: "Art. 7, Numeral 1",
    title: "Formación Profesional de Calidad",
    summary: "Recibir formación integral acorde con el diseño curricular del programa matriculado.",
    description: "El aprendiz tiene derecho a contar con instructores calificados, ambientes pedagógicos adecuados, recursos tecnológicos actualizados y materiales de formación requeridos para su desarrollo técnico y humano.",
    category: "Formación",
    practicalExample: "Si en un programa de Software las máquinas de laboratorio no cuentan con las herramientas curriculares, el aprendiz puede solicitar formalmente la adecuación del ambiente."
  },
  {
    id: "der-2",
    article: "Art. 7, Numeral 2",
    title: "Trato Digno y No Discriminación",
    summary: "Ser tratado con respeto por toda la comunidad educativa sin distingo alguno.",
    description: "Garantía de recibir un trato respetuoso de parte de directivos, instructores, administrativos y compañeros, sin discriminación por razones de raza, género, credo religioso, orientación o condición socioeconómica.",
    category: "Garantías",
    practicalExample: "Toda retroalimentación pedagógica debe formularse en términos respetuosos y constructivos, garantizando la dignidad del estudiante."
  },
  {
    id: "der-3",
    article: "Art. 7, Numeral 3",
    title: "Acceso a Bienestar al Aprendiz",
    summary: "Disfrutar de los programas institucionales de salud, deporte, cultura y apoyos.",
    description: "Derecho a postularse a apoyos de sostenimiento (regular, FIC), acceder a orientación psicosocial, actividades deportivas, talleres culturales, y programas de prevención de la salud.",
    category: "Bienestar",
    practicalExample: "Un aprendiz con dificultades económicas puede postularse en las convocatorias semestrales de apoyos de sostenimiento de su centro."
  },
  {
    id: "der-4",
    article: "Art. 7, Numeral 5",
    title: "Inducción Completa y Oportuna",
    summary: "Conocer la estructura, reglamentos, derechos y deberes al iniciar su proceso.",
    description: "Recibir al inicio del programa la inducción institucional que le permita apropiar la cultura SENA, el funcionamiento de las plataformas LMS (Zajuna / SOFIA Plus), y la ruta formativa de su etapa lectiva y productiva.",
    category: "Formación",
    practicalExample: "Esta misma plataforma y las jornadas guiadas de inducción forman parte del cumplimiento de este derecho fundamental."
  },
  {
    id: "der-5",
    article: "Art. 7, Numeral 6",
    title: "Conocimiento Previo de Evaluaciones",
    summary: "Conocer los criterios de evaluación, evidencias y plazos con anterioridad.",
    description: "El aprendiz debe ser informado oportunamente sobre los instrumentos y listas de chequeo con los que será evaluado, así como recibir la calificación y retroalimentación dentro de los 8 días hábiles siguientes a la entrega.",
    category: "Evaluación",
    practicalExample: "El instructor debe publicar la rúbrica y criterios antes de solicitar la entrega de la evidencia en la plataforma."
  },
  {
    id: "der-6",
    article: "Art. 7, Numeral 7",
    title: "Derecho a Segundo Evaluador",
    summary: "Solicitar revisión y designación de un segundo instructor cuando haya desacuerdo justificado.",
    description: "Si el aprendiz considera que su calificación no corresponde a los criterios evaluados, puede solicitar por escrito y motivadamente una revisión dentro de los 2 días hábiles siguientes.",
    category: "Evaluación",
    practicalExample: "En caso de no conformidad justificada con una calificación de 'No Aprobado', la coordinación académica asigna un evaluador alterno."
  },
  {
    id: "der-7",
    article: "Art. 7, Numeral 8",
    title: "Representación y Participación",
    summary: "Elegir y ser elegido como vocero de ficha o representante de centro.",
    description: "Participar democráticamente en las elecciones de voceros de ficha, líderes de programa y representantes ante el Comité de Convivencia y Consejo Directivo Nacional.",
    category: "Representación",
    practicalExample: "Durante el primer mes de formación, la ficha elige por votación a su vocero principal y suplente."
  },
  {
    id: "der-8",
    article: "Art. 7, Numeral 9",
    title: "Certificación Oportuna",
    summary: "Recibir el certificado o título al culminar satisfactoriamente el plan de estudios.",
    description: "Una vez aprobados todos los resultados de aprendizaje de la etapa lectiva y cumplida la etapa productiva con su respectiva paz y salvo, el aprendiz tiene derecho a la expedición gratuita de su título.",
    category: "Garantías",
    practicalExample: "La certificación SENA es 100% gratuita y descargable desde los portales oficiales de la entidad."
  }
];

export const SENA_DUTIES: SenaDuty[] = [
  {
    id: "deb-1",
    article: "Art. 9, Numeral 1",
    type: "deber",
    title: "Cumplimiento de Actividades Curriculares",
    summary: "Asistir puntualmente a los ambientes y entregar evidencias en las fechas concertadas.",
    consequence: "El incumplimiento injustificado genera plan de mejoramiento o deserción.",
    category: "Académico"
  },
  {
    id: "deb-2",
    article: "Art. 9, Numeral 2",
    type: "deber",
    title: "Porte Visible del Carné y Uniforme",
    summary: "Portar permanentemente el carné institucional visible y vestir la indumentaria reglamentaria.",
    consequence: "No portarlo puede restringir el acceso al centro de formación por motivos de seguridad.",
    category: "Seguridad e Infraestructura"
  },
  {
    id: "deb-3",
    article: "Art. 9, Numeral 4",
    type: "deber",
    title: "Cuidado de Bienes y Equipos",
    summary: "Hacer uso responsable de herramientas, computadores, talleres e instalaciones del centro.",
    consequence: "Deterioro por dolo o negligencia obliga a la reposición o reparación del bien.",
    category: "Seguridad e Infraestructura"
  },
  {
    id: "deb-4",
    article: "Art. 9, Numeral 6",
    type: "deber",
    title: "Justificación Oportuna de Inasistencias",
    summary: "Presentar soporte médico o legal dentro de los 3 días hábiles siguientes a la falta.",
    consequence: "Faltas injustificadas continuas de 3 días dan lugar a trámite de deserción.",
    category: "Académico"
  },
  {
    id: "deb-5",
    article: "Art. 9, Numeral 8",
    type: "deber",
    title: "Actualización de Datos en Plataformas",
    summary: "Mantener vigentes correo, teléfono y dirección en SOFIA Plus / Zajuna.",
    consequence: "La falta de actualización dificulta notificaciones oficiales y trámites de contrato de aprendizaje.",
    category: "Académico"
  },
  // Prohibiciones
  {
    id: "proh-1",
    article: "Art. 10, Numeral 1",
    type: "prohibicion",
    severity: "Gravísima",
    title: "Plagio y Fraude en Evidencias",
    summary: "Presentar como propios trabajos, investigaciones o proyectos elaborados por terceros o inteligencias artificiales sin cita.",
    consequence: "Cancelación de matrícula e inhabilidad para matricularse en el SENA entre 6 meses y 3 años.",
    category: "Académico"
  },
  {
    id: "proh-2",
    article: "Art. 10, Numeral 2",
    type: "prohibicion",
    severity: "Gravísima",
    title: "Porte de Armas o Sustancias Prohibidas",
    summary: "Ingresar o consumir sustancias psicoactivas, bebidas alcohólicas o portar cualquier tipo de arma en el centro.",
    consequence: "Remisión inmediata a Comité Disciplinario, cancelación fulminante de matrícula y reporte a autoridades.",
    category: "Disciplinario"
  },
  {
    id: "proh-3",
    article: "Art. 10, Numeral 4",
    type: "prohibicion",
    severity: "Grave",
    title: "Suplantación de Identidad",
    summary: "Firmar listas de asistencia por otros compañeros o presentar evaluaciones en nombre de un tercero.",
    consequence: "Sanción con condicionamiento o cancelación de matrícula para ambos aprendices implicados.",
    category: "Disciplinario"
  },
  {
    id: "proh-4",
    article: "Art. 10, Numeral 7",
    type: "prohibicion",
    severity: "Grave",
    title: "Agresión Física o Acoso en Ambientes",
    summary: "Incurrir en conductas de violencia física, verbal, psicológica o ciberacoso en medios presenciales o virtuales.",
    consequence: "Condicionamiento o cancelación de matrícula y aplicación de protocolos de convivencia institucional.",
    category: "Convivencia"
  }
];

export const PRODUCTIVE_MODALITIES: ProductiveModalities[] = [
  {
    id: "contrato-aprendizaje",
    title: "1. Contrato de Aprendizaje (Ley 789 de 2002)",
    description: "Vinculación formativa formal con una empresa patrocinadora, donde el aprendiz aplica sus competencias prácticas en un entorno productivo real.",
    legalBasis: "Ley 789 de 2002 y Decreto 1072 de 2015",
    keyBenefits: [
      "Apoyo de sostenimiento económico mensual legal (mínimo 75% o 100% SMLMV según tasa de desempleo nacional).",
      "Afiliación y cotización a EPS y ARL 100% a cargo de la empresa patrocinadora.",
      "Experiencia laboral directa certificable."
    ],
    requirements: [
      "No haber tenido contrato de aprendizaje previo en el mismo nivel formativo.",
      "Tener aprobada o estar por culminar la etapa lectiva sin pendientes académicos.",
      "Registro activo en el Sistema de Gestión Virtual de Aprendices (SGVA)."
    ]
  },
  {
    id: "proyecto-productivo",
    title: "2. Proyecto Productivo (Fondo Emprender o SENNOVA)",
    description: "Desarrollo de una iniciativa de negocio, innovación o investigación aplicada que resuelve una necesidad técnica real o da origen a una empresa.",
    legalBasis: "Acuerdo 0009 de 2024 y normatividad SENNOVA",
    keyBenefits: [
      "Posibilidad de postulación a capital semilla no reembolsable del Fondo Emprender.",
      "Asesoría técnica y mentoría especializada de gestores de emprendimiento.",
      "Desarrollo de habilidades directivas, comerciales y de innovación."
    ],
    requirements: [
      "Aprobación del plan de negocio por el comité técnico del centro.",
      "Cronograma de ejecución y entrega de informes periódicos de avance.",
      "Validación de impacto y sostenibilidad económica o social."
    ]
  },
  {
    id: "pasantia",
    title: "3. Pasantía Formativa",
    description: "Práctica concertada en entidades públicas, Organizaciones No Gubernamentales (ONG), o pequeñas y medianas empresas mediante convenio.",
    legalBasis: "Reglamento del Aprendiz SENA - Modalidades",
    keyBenefits: [
      "Inserción en proyectos comunitarios, entidades estatales o sector social.",
      "Flexibilidad en concertación de horarios según el plan formativo.",
      "Afiliación a ARL cubierta por la institución o el SENA."
    ],
    requirements: [
      "Firma previa de concertación de actividades entre el Centro y la entidad.",
      "Designación de tutor empresarial y seguimiento del instructor asignado.",
      "Certificado final de cumplimiento expedido por la empresa receptora."
    ]
  },
  {
    id: "vinculo-laboral",
    title: "4. Vínculo Laboral o Contractual",
    description: "Aplica cuando el aprendiz ya labora en una empresa y sus funciones cotidianas guardan relación directa con el programa de formación cursado.",
    legalBasis: "Reglamento del Aprendiz SENA",
    keyBenefits: [
      "Continuidad de su salario y prestaciones de ley vigentes.",
      "Homologación de su labor diaria como cumplimiento de la etapa productiva.",
      "Crecimiento y promoción laboral dentro de la misma organización."
    ],
    requirements: [
      "Certificación laboral detallada con funciones afines al programa.",
      "Aprobación previa del Coordinador Académico del Centro.",
      "Seguimiento concertado con el instructor de etapa productiva."
    ]
  },
  {
    id: "monitoria",
    title: "5. Monitorías Institucionales",
    description: "Apoyo técnico en laboratorios, ambientes de aprendizaje o proyectos de investigación en el mismo Centro de Formación SENA.",
    legalBasis: "Resolución anual de monitorías SENA",
    keyBenefits: [
      "Estímulo económico mensual fijado por la Dirección General.",
      "Profundización técnica y fortalecimiento de liderazgo pedagógico.",
      "Cercanía permanente con el equipo de instructores del Centro."
    ],
    requirements: [
      "Excelente rendimiento académico durante la etapa lectiva.",
      "No tener sanciones disciplinarias vigentes en el expediente.",
      "Superar el proceso de convocatoria pública interna de monitorías."
    ]
  },
  {
    id: "unidad-familiar",
    title: "6. Apoyo a Unidad Productiva Familiar",
    description: "Aplicación de competencias en una microempresa familiar formal o en proceso de legalización, impulsando su productividad.",
    legalBasis: "Acuerdo 0009 de 2024",
    keyBenefits: [
      "Fortalecimiento directo de la economía familiar.",
      "Modernización de procesos productivos mediante tecnología SENA.",
      "Posibilidad de articular con programas de formalización empresarial."
    ],
    requirements: [
      "Demostrar parentesco de consanguinidad hasta el segundo grado.",
      "Plan de mejoramiento técnico concertado con instructor de seguimiento.",
      "Evidencias verificables de impacto en la unidad de negocio."
    ]
  }
];

export const CASE_DILEMMAS: CaseDilemma[] = [
  {
    id: "caso-1",
    title: "Inasistencia imprevista por quebrantos de salud",
    scenario: "Carlos es aprendiz de Desarrollo de Software. Durante la semana de entrega de proyectos finales, presenta una urgencia médica y es incapacitado por 4 días. ¿Cuál es la conducta correcta que debe adoptar Carlos según el reglamento?",
    options: [
      {
        id: "opt-1a",
        text: "Esperar a reincorporarse dos semanas después y hablar informalmente con los instructores sin entregar papeles.",
        isCorrect: false,
        explanation: "Incorrecto. Dejar pasar el tiempo sin soporte oficial genera registro de inasistencias injustificadas que activan el comité de deserción.",
        regulationArticle: "Art. 9 y 22: El trámite de inasistencia debe ser oportuno y fundamentado formalmente."
      },
      {
        id: "opt-1b",
        text: "Radicar o enviar por correo la incapacidad médica certificada dentro de los 3 días hábiles siguientes al inicio de la falta.",
        isCorrect: true,
        explanation: "¡Correcto! El reglamento estipula que el aprendiz cuenta con 3 días hábiles para allegar la justificación médica o legal ante la coordinación o instructores.",
        regulationArticle: "Art. 9, Numeral 6 y Art. 22 del Reglamento: Plazo máximo de 3 días hábiles para justificar inasistencias."
      },
      {
        id: "opt-1c",
        text: "Pedirle a un compañero que firme las listas de asistencia en su nombre para que nadie note su ausencia.",
        isCorrect: false,
        explanation: "Incorrecto y peligroso. Suplantar firmas es una falta disciplinaria grave que acarrea sanción a ambos aprendices.",
        regulationArticle: "Art. 10, Numeral 4: Prohibición de suplantación de personas en actividades formativas."
      }
    ]
  },
  {
    id: "caso-2",
    title: "Solicitud de copia de proyecto en el taller",
    scenario: "En la víspera de la sustentación técnica, Laura no alcanzó a programar la base de datos de su proyecto. Le pide a Andrés que le comparta su archivo fuente para cambiarle el título y subirlo como propio. ¿Qué principio y norma aplica?",
    options: [
      {
        id: "opt-2a",
        text: "Andrés debe compartirlo por solidaridad entre compañeros, ya que en el SENA se fomenta el trabajo en equipo.",
        isCorrect: false,
        explanation: "Incorrecto. La solidaridad no legitima el fraude académico. Presentar trabajo ajeno como propio viola el código de integridad.",
        regulationArticle: "Art. 10: El plagio no es colaboración; es una falta académica y disciplinaria gravísima."
      },
      {
        id: "opt-2b",
        text: "Andrés debe negarse a prestar su archivo, pero puede orientar a Laura en los conceptos para que ella construya su propia evidencia.",
        isCorrect: true,
        explanation: "¡Excelente! Apoyar pedagógicamente a un compañero es bienvenido, pero el producto entregado debe ser original del autor. El plagio conlleva sanción severa.",
        regulationArticle: "Art. 10, Numeral 1: Prohibición expresa de plagio de evidencias e investigaciones."
      },
      {
        id: "opt-2c",
        text: "Ambos pueden combinar partes y no citar a nadie, pues las evidencias son de dominio público del SENA.",
        isCorrect: false,
        explanation: "Incorrecto. Todas las evidencias evaluativas son individuales o de equipos designados, y deben respetar los derechos de autor.",
        regulationArticle: "Art. 10: Toda evidencia debe reflejar la apropiación individual de competencias."
      }
    ]
  },
  {
    id: "caso-3",
    title: "Oferta de práctica empresarial sin seguridad social",
    scenario: "Una empresa contacta a Valentina y le ofrece hacer su etapa productiva pagándole el salario mínimo en efectivo, pero manifestando que no la afiliará a EPS ni a ARL para 'ahorrar costos operativos'. ¿Qué debe hacer Valentina?",
    options: [
      {
        id: "opt-3a",
        text: "Aceptar inmediatamente porque el dinero en efectivo es más rápido de recibir y no importa la afiliación.",
        isCorrect: false,
        explanation: "Incorrecto. Realizar la etapa productiva sin ARL ni EPS es ilegal y pone en riesgo la vida del aprendiz y la validez de la certificación.",
        regulationArticle: "Ley 789 de 2002: La afiliación a riesgos laborales (ARL) y salud (EPS) es irrenunciable e imperativa."
      },
      {
        id: "opt-3b",
        text: "Rechazar la oferta irregular y reportar la situación a la Coordinación de Relaciones Corporativas / Contrato de Aprendizaje del SENA.",
        isCorrect: true,
        explanation: "¡Correcto! Todo contrato de aprendizaje o pasantía debe garantizar legalmente la cobertura en riesgos laborales (ARL) y salud (EPS). El SENA protege a sus aprendices verificando las condiciones legales.",
        regulationArticle: "Decreto 1072 de 2015 y Ley 789: Es obligación legal de la empresa patrocinadora afiliar al aprendiz."
      },
      {
        id: "opt-3c",
        text: "Pagar ella misma su salud y continuar en la empresa sin informar al centro de formación.",
        isCorrect: false,
        explanation: "Incorrecto. Las prácticas no registradas ni avaladas por el centro no serán avaladas para la titulación oficial.",
        regulationArticle: "Reglamento SENA: Toda alternativa de etapa productiva debe contar con aval institucional previo."
      }
    ]
  }
];

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: "q-1",
    category: "Reglamento",
    question: "¿Quién es considerado Aprendiz SENA según el Acuerdo 0009 de 2024 (Reglamento del Aprendiz)?",
    options: [
      "Toda persona natural con contrato laboral a término indefinido en la institución.",
      "Toda persona natural matriculada en los programas de formación profesional integral de la entidad en cualquier nivel y modalidad.",
      "Un voluntario académico que no contrae derechos ni obligaciones formales con el SENA.",
      "El egresado que realiza labores docentes ocasionales en los centros de formación."
    ],
    correctAnswer: 1,
    feedback: "El aprendiz es el sujeto activo de la formación profesional integral desde el momento voluntario de la matrícula hasta su certificación formal.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 2 - Definición de Aprendiz SENA"
  },
  {
    id: "q-2",
    category: "Derechos del Aprendiz",
    question: "¿Qué derecho asiste al aprendiz cuando se encuentra en desacuerdo justificado con una calificación o juicio evaluativo emitido por el instructor?",
    options: [
      "Suspender unilateralmente su formación y no volver a asistir a sesiones de clase.",
      "Solicitar de manera respetuosa la revisión de la evidencia y, de persistir la discrepancia, la designación de un segundo evaluador idóneo.",
      "Modificar directamente su nota en el sistema institucional Zajuna o SOFIA Plus.",
      "Exigir que sus compañeros de ficha califiquen su evidencia mediante votación pública."
    ],
    correctAnswer: 1,
    feedback: "El reglamento consagra el derecho fundamental al debido proceso, permitiendo solicitar la revisión objetiva y la designación de un segundo evaluador.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 7 - Derechos del Aprendiz (Revisión y Segundo Evaluador)"
  },
  {
    id: "q-3",
    category: "Deberes y Faltas",
    question: "¿Cuál es el deber reglamentario del aprendiz respecto al porte del carné institucional del SENA?",
    options: [
      "Mantenerlo en su residencia y presentarlo únicamente el día de la ceremonia de graduación.",
      "Portarlo de manera visible y permanente en lugar destacado (pecho o cuello) durante el ingreso y permanencia en los centros de formación y ambientes de aprendizaje.",
      "Prestarlo libremente a terceros o personas ajenas a la entidad para facilitarles el acceso a los talleres.",
      "Su porte es estrictamente opcional y no tiene ninguna relevancia para la seguridad en las sedes."
    ],
    correctAnswer: 1,
    feedback: "El carné institucional es un documento personal e intransferible cuyo porte visible es obligatorio por seguridad, control y pertenencia institucional.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 9, Numeral 2 - Porte del Carné Institucional"
  },
  {
    id: "q-4",
    category: "Permanencia y Trámites",
    question: "¿Cuál es el plazo reglamentario máximo para que un aprendiz justifique documentalmente una inasistencia por fuerza mayor o incapacidad médica?",
    options: [
      "Hasta quince (15) días calendario posteriores al hecho sin importar el tipo de falta.",
      "Dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho o vencimiento de la incapacidad.",
      "Al finalizar el trimestre de formación durante el cierre de juicios evaluativos.",
      "No existe plazo reglamentario porque no es necesario justificar inasistencias en el SENA."
    ],
    correctAnswer: 1,
    feedback: "El aprendiz debe presentar los soportes oficiales a su instructor o coordinación académica dentro de los 3 días hábiles siguientes.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 21 - Justificación de Inasistencias y Plazos Legales"
  },
  {
    id: "q-5",
    category: "Permanencia y Trámites",
    question: "¿En cuál de las siguientes situaciones se configura formalmente la causal de deserción según el Reglamento del Aprendiz?",
    options: [
      "Cuando el aprendiz llega diez minutos tarde a una sesión formativa por problemas de transporte.",
      "Cuando acumula tres (3) días consecutivos de inasistencia injustificada en presencial, o cuando en modalidad virtual no reporta actividades por el plazo normativo sin justa causa.",
      "Cuando radica oportunamente una solicitud formal de aplazamiento de matrícula soportada por calamidad doméstica.",
      "Cuando reprueba una sola evidencia de desempeño inicial en el primer trimestre."
    ],
    correctAnswer: 1,
    feedback: "La deserción se configura por inasistencia injustificada durante 3 días hábiles continuos o abandono de la plataforma virtual, activando el debido proceso de cancelación.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 22 - Declaratoria y Causales de Deserción"
  },
  {
    id: "q-6",
    category: "Deberes y Faltas",
    question: "¿Cómo califica el Reglamento del Aprendiz la conducta de plagio, suplantación o fraude en evaluaciones y proyectos formativos?",
    options: [
      "Conducta de libre expresión sin relevancia sancionatoria.",
      "Falta Leve de carácter pedagógico y subsanable con una disculpa.",
      "Falta Gravísima que atenta contra la ética institucional, la honestidad y los derechos de autor.",
      "Error involuntario que solo amerita una felicitación por esfuerzo investigativo."
    ],
    correctAnswer: 2,
    feedback: "El plagio y la falsificación vulneran la ética ciudadana y constituyen faltas gravísimas que conllevan investigación formal ante el Comité y posible cancelación de matrícula.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 26 - Clasificación de Faltas Disciplinarias y Académicas"
  },
  {
    id: "q-7",
    category: "Medidas Formativas y Sanciones",
    question: "¿Cuáles son las medidas formativas de carácter pedagógico y preventivo contempladas antes de recurrir a sanciones disciplinarias?",
    options: [
      "El cobro de multas económicas en dinero en efectivo a favor del centro.",
      "El llamado de atención verbal y la concertación de un Plan de Mejoramiento Académico o Disciplinario.",
      "La suspensión indefinida del servicio de energía o equipos en el aula del aprendiz.",
      "La retención física de los documentos originales de identidad del aprendiz."
    ],
    correctAnswer: 1,
    feedback: "El modelo pedagógico SENA prioriza la prevención reflexiva mediante el llamado de atención verbal y el plan de mejoramiento concertado para superar las dificultades.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 28 - Medidas Formativas y Acompañamiento Pedagógico"
  },
  {
    id: "q-8",
    category: "Medidas Formativas y Sanciones",
    question: "¿Qué efectos legales produce la imposición de la sanción disciplinaria de Cancelación de Matrícula?",
    options: [
      "Traslado automático y obligatorio a otro centro de formación en diferente regional.",
      "Pérdida irrevocable de la calidad de aprendiz SENA y la imposición de una inhabilidad legal para matricularse en la entidad entre 6 meses y 3 años.",
      "Únicamente una amonestación en redes sociales sin impacto en la matrícula académica.",
      "La obligación civil de pagar el costo total de los trimestres cursados a una entidad financiera."
    ],
    correctAnswer: 1,
    feedback: "La cancelación de matrícula es la sanción máxima por faltas gravísimas y acarrea una inhabilidad legal temporal de 6 meses a 3 años para cursar programas en el SENA.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 31 - Sanciones e Inhabilidades Institucionales"
  },
  {
    id: "q-9",
    category: "Etapa Productiva y Bienestar",
    question: "¿Cuántas alternativas oficiales reconoce el SENA para que el aprendiz desarrolle su etapa productiva y aplique sus competencias?",
    options: [
      "Solo una alternativa: El contrato de aprendizaje exclusivo con multinacionales privadas.",
      "Seis alternativas: Contrato de Aprendizaje, Proyecto Productivo, Pasantía, Vínculo Laboral, Monitorías y Unidad Productiva Familiar.",
      "Dos alternativas: Voluntariado no formal y trabajo independiente sin supervisión técnica.",
      "Cuatro alternativas reservadas únicamente para programas virtuales y a distancia."
    ],
    correctAnswer: 1,
    feedback: "El SENA reconoce 6 alternativas reglamentarias y flexibles para que cada aprendiz certifique su etapa productiva según sus metas y oportunidades reales.",
    regulationReference: "Acuerdo 0009 de 2024, Art. 12 - Alternativas de Etapa Productiva"
  },
  {
    id: "q-10",
    category: "Etapa Productiva y Bienestar",
    question: "¿Qué garantías obligatorias debe suministrar la empresa patrocinadora al aprendiz durante la ejecución práctica de un Contrato de Aprendizaje (Ley 789 de 2002)?",
    options: [
      "Únicamente apoyo para pasajes de transporte los fines de semana.",
      "Pago oportuno del apoyo de sostenimiento pactado, cobertura y cotización completa a EPS (Salud) y afiliación total a la Administradora de Riesgos Laborales (ARL).",
      "Préstamos bancarios a largo plazo para adquisición de vivienda.",
      "Ninguna cobertura médica ni económica dado que no existe relación laboral directa."
    ],
    correctAnswer: 1,
    feedback: "Por mandato de la Ley 789 de 2002 y el Reglamento del Aprendiz, la empresa patrocinadora debe cubrir el apoyo de sostenimiento y afiliar al aprendiz a ARL y EPS.",
    regulationReference: "Ley 789 de 2002, Art. 30 y Acuerdo 0009 de 2024 - Normas de Patrocinio"
  }
];

export const INITIAL_APPRENTICES_COHORT: ApprenticeProfile[] = [
  {
    id: "apr-01",
    fullName: "Valentina Gómez Salazar",
    docType: "CC",
    docNumber: "1020485912",
    email: "vgomez912@soy.sena.edu.co",
    ficha: "2834920",
    program: "Tecnología en Análisis y Desarrollo de Software (ADSO)",
    regional: "Regional Tolima",
    center: "Centro de Industria y Construcción - Regional Tolima",
    enrollmentDate: "2026-10-15",
    status: "Aprobado",
    score: 100,
    completedAt: "2026-10-20 14:32",
    attemptsCount: 1,
    answersSummary: {
      total: 10,
      correct: 10,
      incorrectCategories: []
    }
  },
  {
    id: "apr-02",
    fullName: "Juan David Rincón Moreno",
    docType: "TI",
    docNumber: "1075849301",
    email: "jdrincon301@soy.sena.edu.co",
    ficha: "2834920",
    program: "Tecnología en Análisis y Desarrollo de Software (ADSO)",
    regional: "Regional Tolima",
    center: "Centro de Industria y Construcción - Regional Tolima",
    enrollmentDate: "2026-10-15",
    status: "Aprobado",
    score: 90,
    completedAt: "2026-10-21 10:15",
    attemptsCount: 1,
    answersSummary: {
      total: 10,
      correct: 9,
      incorrectCategories: ["Deberes y Faltas"]
    }
  },
  {
    id: "apr-03",
    fullName: "Mariana Restrepo Cadavid",
    docType: "CC",
    docNumber: "1152439201",
    email: "mrestrepo201@soy.sena.edu.co",
    ficha: "2835104",
    program: "Tecnología en Gestión Administrativa",
    regional: "Regional Antioquia",
    center: "Centro de Formación en Tecnologías de la Información y las Comunicaciones",
    enrollmentDate: "2026-10-16",
    status: "Plan de Mejoramiento",
    score: 60,
    completedAt: "2026-10-22 16:45",
    attemptsCount: 1,
    instructorNotes: "Se asigna taller pedagógico de refuerzo en el Capítulo IV (Deberes y Faltas gravísimas).",
    answersSummary: {
      total: 10,
      correct: 6,
      incorrectCategories: ["Deberes y Faltas", "Etapa Productiva y Bienestar"]
    }
  },
  {
    id: "apr-04",
    fullName: "Brayan Stiven Ortiz Quintero",
    docType: "CC",
    docNumber: "1098472910",
    email: "bortiz910@soy.sena.edu.co",
    ficha: "2835104",
    program: "Tecnología en Gestión Administrativa",
    regional: "Regional Santander",
    center: "Centro de Servicios Empresariales y Turísticos",
    enrollmentDate: "2026-10-16",
    status: "En proceso",
    attemptsCount: 0
  },
  {
    id: "apr-05",
    fullName: "Daniela Fernanda Chaux Osorio",
    docType: "CC",
    docNumber: "1061984723",
    email: "dfchaux723@soy.sena.edu.co",
    ficha: "2836215",
    program: "Tecnología en Mecatrónica Industrial",
    regional: "Regional Valle",
    center: "Centro de Electricidad y Automatización Industrial - CEAI",
    enrollmentDate: "2026-10-17",
    status: "Aprobado",
    score: 90,
    completedAt: "2026-10-24 09:20",
    attemptsCount: 2,
    answersSummary: {
      total: 10,
      correct: 9,
      incorrectCategories: ["Identidad Institucional"]
    }
  },
  {
    id: "apr-06",
    fullName: "Mateo Alejandro Caicedo Pérez",
    docType: "TI",
    docNumber: "1083920194",
    email: "mcaicedo194@soy.sena.edu.co",
    ficha: "2836215",
    program: "Tecnología en Mecatrónica Industrial",
    regional: "Regional Valle",
    center: "Centro de Electricidad y Automatización Industrial - CEAI",
    enrollmentDate: "2026-10-17",
    status: "Sin iniciar",
    attemptsCount: 0
  }
];

export const SENA_REGIONALES = [
  "Regional Distrito Capital",
  "Regional Antioquia",
  "Regional Valle",
  "Regional Santander",
  "Regional Atlántico",
  "Regional Cundinamarca",
  "Regional Caldas",
  "Regional Risaralda",
  "Regional Bolívar",
  "Regional Tolima",
  "Regional Nariño",
  "Regional Huila",
  "Regional Boyacá",
  "Regional Cauca",
  "Regional Meta"
];

export const SENA_PROGRAMS = [
  "Tecnología en Análisis y Desarrollo de Software (ADSO)",
  "Tecnología en Gestión Administrativa",
  "Tecnología en Mecatrónica Industrial",
  "Tecnología en Gestión del Talento Humano",
  "Tecnología en Gestión Contable y de Información Financiera",
  "Tecnología en Animación Digital",
  "Técnico en Sistemas",
  "Técnico en Cocina",
  "Técnico en Producción Agropecuaria"
];

export const REGULATION_DEFINITIONS: RegulationDefinition[] = [
  {
    id: "def-1",
    term: "Aprendiz SENA",
    concept: "Sujeto Activo de la Formación",
    definition: "Toda persona natural matriculada en los programas de formación profesional integral de la entidad en cualquier nivel (Operario, Auxiliar, Técnico, Tecnólogo, Especialización Técnica) y modalidad (presencial, virtual o combinada).",
    scope: "Adquiere derechos, deberes y asume el compromiso ético institucional desde el momento de la matrícula hasta su certificación formal.",
    practicalApplication: "Mantiene la calidad de aprendiz activo durante la etapa lectiva y la etapa productiva, debiendo portar su carné y acatar el Acuerdo 0009 de 2024."
  },
  {
    id: "def-2",
    term: "Formación Profesional Integral (FPI)",
    concept: "Modelo Pedagógico Institucional",
    definition: "Proceso educativo teórico-práctico de carácter integral, orientado al desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para la convivencia social, que le permiten a la persona actuar crítica y creativamente en el mundo del trabajo y de la vida.",
    scope: "Eje misional de la Ley 119 de 1994 y del nuevo Reglamento del Aprendiz.",
    practicalApplication: "No solo te prepara para operar una máquina o escribir código de software, sino que fortalece tu ética ciudadana, liderazgo y capacidad de trabajo en equipo."
  },
  {
    id: "def-3",
    term: "Ambiente de Aprendizaje",
    concept: "Espacio de Mediación Pedagógica",
    definition: "Espacio físico, virtual o combinado donde convergen aprendices, instructores, recursos didácticos, maquinaria, herramientas y tecnologías para dinamizar el proceso de enseñanza-aprendizaje y la evaluación formativa.",
    scope: "Comprende aulas, laboratorios, talleres de maquinaria, fincas didácticas, plataformas LMS (Zajuna) y empresas patrocinadoras.",
    practicalApplication: "El aprendiz debe cumplir en ellos las normas de Seguridad y Salud en el Trabajo (SST), uso de EPP y respeto por los bienes públicos."
  },
  {
    id: "def-4",
    term: "Competencia Laboral y Resultados de Aprendizaje (RAP)",
    concept: "Unidad Curricular y Criterio de Logro",
    definition: "La Competencia es la capacidad demostrada para interactuar idóneamente en situaciones del sector productivo. Los Resultados de Aprendizaje (RAP) son los logros concretos que el aprendiz debe alcanzar y evidenciar en cada fase curricular.",
    scope: "Estructura del diseño curricular aprobado por el Ministerio de Educación y el SENA.",
    practicalApplication: "Para certificar un trimestre se requiere la aprobación del 100% de los RAP programados en el diseño de la ficha."
  },
  {
    id: "def-5",
    term: "Evidencia de Aprendizaje",
    concept: "Manifestación Tangible del Saber",
    definition: "Pruebas manifiestas y verificables de los conocimientos, habilidades, destrezas y actitudes del aprendiz. Se clasifican en Evidencias de Conocimiento (evaluaciones, cuestionarios), de Desempeño (observación directa en taller o simulación) y de Producto (informes, piezas elaboradas, software funcional).",
    scope: "Sustento objetivo para la emisión del juicio de evaluación.",
    practicalApplication: "Todas las evidencias deben ser de autoría propia; el plagio constituye falta gravísima en el Acuerdo 0009 de 2024."
  },
  {
    id: "def-6",
    term: "Juicio de Evaluación",
    concept: "Calificación Oficial",
    definition: "Dictamen cualitativo emitido por el instructor en la plataforma institucional respecto al logro de un resultado de aprendizaje. Se califica como 'Aprobado (A)' cuando el aprendiz alcanza los criterios, o 'No Aprobado (NA)' si no cumple la totalidad de evidencias.",
    scope: "Registrado oficialmente en el sistema académico SOFIA Plus / Zajuna.",
    practicalApplication: "Un resultado 'No Aprobado' activa de inmediato el plan de mejoramiento académico pedagógico para subsanar los vacíos en un plazo concertado."
  },
  {
    id: "def-7",
    term: "Comité de Evaluación y Seguimiento",
    concept: "Instancia Consultiva de Debido Proceso",
    definition: "Órgano colegiado del Centro de Formación integrado por coordinadores, instructores, voceros de aprendices y orientadores de bienestar, encargado de analizar el desempeño formativo, recomendar estímulos, planes de mejoramiento o sanciones disciplinarias garantizando el derecho a la defensa.",
    scope: "Sesiona de forma ordinaria o extraordinaria por convocatoria formal.",
    practicalApplication: "Escucha obligatoriamente los descargos del aprendiz y valora las pruebas antes de emitir cualquier recomendación de sanción a la Subdirección."
  }
];

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: "stage-ingreso",
    stage: "Ingreso",
    title: "1. Etapa de Ingreso al SENA",
    subtitle: "Formalización, Identificación y Acogida Institucional",
    description: "Proceso mediante el cual el aspirante admitido adquiere formalmente la calidad de aprendiz SENA y se integra a la comunidad educativa.",
    items: [
      {
        name: "Matrícula Formal",
        description: "Acto voluntario y vinculante que acredita la condición de aprendiz SENA tras haber superado las fases de selección en la plataforma institucional.",
        condition: "Presentación de documento de identidad legal, títulos previos requeridos (ej. diploma de bachiller) y firma del acta de compromiso institucional."
      },
      {
        name: "Carnetización Institucional",
        description: "Expedición oficial del carné que identifica al aprendiz con su ficha, programa, regional y datos de contacto.",
        condition: "De porte obligatorio y permanente en el pecho o cuello al ingresar y permanecer en cualquier sede o taller del SENA."
      },
      {
        name: "Inducción Institucional Obligatoria",
        description: "Ciclo formativo previo al inicio lectivo diseñado para apropiar la misión, los valores, el reglamento del aprendiz y el manejo de herramientas tecnológicas.",
        condition: "Requisito de asistencia y aprobación del 100% de actividades pedagógicas de inducción."
      },
      {
        name: "Caracterización Diagnóstica",
        description: "Registro de variables socioeconómicas, de salud, conectividad e intereses de bienestar para focalizar apoyos de sostenimiento y acompañamiento psicosocial.",
        condition: "Diligenciamiento en el primer trimestre en la plataforma de Bienestar al Aprendiz."
      }
    ]
  },
  {
    id: "stage-permanencia",
    stage: "Permanencia",
    title: "2. Etapa de Permanencia y Novedades",
    subtitle: "Trayectoria Formativa, Asistencia y Trámites de Novedad",
    description: "Periodo en el que el aprendiz cursa su ruta lectiva y productiva, cumpliendo compromisos y tramitando formalmente cualquier situación especial.",
    items: [
      {
        name: "Asistencia y Puntualidad",
        description: "Participación activa en los ambientes de formación. El aprendiz debe cumplir mínimo el 85% de las horas programadas para mantener la permanencia.",
        condition: "Inasistencias médicas o de fuerza mayor deben justificarse documentalmente dentro de los 3 días hábiles siguientes.",
        deadline: "Máximo 3 días hábiles"
      },
      {
        name: "Traslado de Ficha o Centro",
        description: "Solicitud motivada para continuar la formación en otra ficha del mismo programa o en otro Centro de Formación del país por cambio de domicilio o condiciones laborales.",
        condition: "Estar a paz y salvo académico, tener cupo disponible en el centro receptor y contar con aval de la coordinación.",
        deadline: "Al finalizar un trimestre académico"
      },
      {
        name: "Aplazamiento de la Matrícula",
        description: "Suspensión temporal del proceso formativo solicitada por el aprendiz por motivos de fuerza mayor debidamente soportados (enfermedad grave, servicio militar, maternidad/paternidad, calamidad doméstica).",
        condition: "Se autoriza hasta por un periodo máximo de seis (6) meses continuos o discontinuos por una sola vez en el programa.",
        deadline: "Hasta por 6 meses calendario"
      },
      {
        name: "Reintegro a la Formación",
        description: "Solicitud formal radicada por el aprendiz que se encuentra en estado de aplazamiento para reincorporarse a la formación en la ficha que corresponda a su avance curricular.",
        condition: "Debe presentarse por escrito con mínimo un (1) mes de antelación al vencimiento del plazo de aplazamiento autorizado.",
        deadline: "Mínimo 30 días antes del vencimiento"
      },
      {
        name: "Retiro Voluntario",
        description: "Manifestación escrita y libre del aprendiz comunicando su decisión de no continuar en el programa de formación.",
        condition: "Si se radica formalmente, no genera sanciones ni inhabilidades en la plataforma institucional del SENA.",
        deadline: "En cualquier momento de la formación"
      },
      {
        name: "Deserción y sus Causales",
        description: "Declaratoria formal de pérdida del cupo formativo. Ocurre cuando el aprendiz: a) Inasiste injustificadamente tres (3) días consecutivos; b) Acumula el 15% de fallas injustificadas en el trimestre; c) No se reintegra vencido el aplazamiento; d) En formación virtual, no ingresa ni entrega evidencias durante un mes continuo.",
        condition: "Activa citación al Comité para justificación; si no asiste ni justifica, se procede a la cancelación de matrícula e inhabilidad de seis (6) meses para matricularse en el SENA.",
        deadline: "3 días continuos o 15% acumulado"
      }
    ]
  },
  {
    id: "stage-certificacion",
    stage: "Certificación",
    title: "3. Etapa de Certificación y Grado",
    subtitle: "Culminación Exitosa, Paz y Salvo y Titulación Oficial",
    description: "Fase culminante donde el SENA expide el título o certificado acreditando las competencias laborales adquiridas para el desempeño laboral.",
    items: [
      {
        name: "Aprobación del 100% de Resultados (RAP)",
        description: "Haber cursado y aprobado la totalidad de los resultados de aprendizaje tanto de la Etapa Lectiva como de la Etapa Productiva registrada en SOFIA Plus.",
        condition: "Juicio evaluativo 'Aprobado (A)' en todas las competencias curriculares del programa."
      },
      {
        name: "Paz y Salvo Integral de Centro",
        description: "Documento oficial que certifica que el aprendiz no adeuda libros en biblioteca, herramientas en almacén, materiales de taller, elementos de bienestar ni tiene procesos disciplinarios pendientes.",
        condition: "Firmado digitalmente por coordinadores, almacén, biblioteca y líder de bienestar."
      },
      {
        name: "Presentación Pruebas Saber TyT",
        description: "Para aprendices de nivel Tecnológico, es requisito legal e institucional de grado haber presentado el examen de Estado de la Calidad de la Educación Superior Saber TyT (Decreto 3963 de 2009).",
        condition: "Aporte del certificado de presentación del examen expedido por el ICFES."
      },
      {
        name: "Expedición Gratuita y Digital de Título",
        description: "Generación del diploma y acta de grado oficial con código de verificación QR y registro en el Sistema Nacional de Información de la Educación Superior (SNIES) o en el repositorio público del SENA.",
        condition: "100% gratuito. Se descarga desde el portal oficial de certificados del SENA con validez legal permanente."
      }
    ]
  }
];

export const DISCIPLINARY_MEASURES: DisciplinaryMeasure[] = [
  // Faltas
  {
    id: "falta-acad",
    type: "falta",
    classification: "Falta Académica",
    title: "Incumplimiento en Compromisos Formativos",
    description: "Se configura cuando el aprendiz no entrega evidencias en los plazos establecidos, no asiste a sesiones programadas sin justificación, o presenta bajo rendimiento sistemático frente a las competencias.",
    authority: "Instructor del área / Equipo Pedagógico de la Ficha",
    effect: "Genera llamado de atención verbal y formulación obligatoria de Plan de Mejoramiento Académico.",
    legalBasis: "Acuerdo 0009 de 2024 - Régimen Formativo"
  },
  {
    id: "falta-disc",
    type: "falta",
    classification: "Falta Disciplinaria",
    title: "Conductas que Afectan la Convivencia y los Bienes",
    description: "Comportamientos que atentan contra el respeto a compañeros, instructores, personal administrativo, o que causan daño a maquinaria, infraestructura, instalaciones físicas o ambientes tecnológicos.",
    authority: "Comité de Evaluación y Seguimiento / Subdirección de Centro",
    effect: "Calificación según gravedad (Leve, Grave, Gravísima) y aplicación de medidas formativas o sancionatorias.",
    legalBasis: "Acuerdo 0009 de 2024 - Criterios de Calificación"
  },
  // Medidas Formativas
  {
    id: "med-verbal",
    type: "medida_formativa",
    classification: "Medida Formativa",
    title: "1. Llamado de Atención Verbal",
    description: "Diálogo pedagógico y reflexivo entre el instructor o coordinador y el aprendiz ante una falta leve o comportamiento inadecuado, invitándolo a corregir su actitud sin generar antecedente negativo en su hoja de vida.",
    authority: "Cualquier instructor o coordinador del Centro",
    effect: "Carácter exclusivamente pedagógico y preventivo. No genera anotación sancionatoria.",
    legalBasis: "Acuerdo 0009 de 2024 - Medidas Preventivas"
  },
  {
    id: "med-plan-acad",
    type: "medida_formativa",
    classification: "Medida Formativa",
    title: "2. Plan de Mejoramiento Académico",
    description: "Estrategia pedagógica concertada mediante acta escrita en la que se formulan actividades complementarias, tutorías y entregas específicas para que el aprendiz alcance resultados de aprendizaje no aprobados.",
    authority: "Instructor responsable del resultado de aprendizaje",
    effect: "Plazo de ejecución definido (máximo 30 días calendario). Si se cumple satisfactoriamente, se aprueba la competencia.",
    legalBasis: "Acuerdo 0009 de 2024 - Planes de Mejoramiento"
  },
  {
    id: "med-plan-disc",
    type: "medida_formativa",
    classification: "Medida Formativa",
    title: "3. Plan de Mejoramiento Disciplinario",
    description: "Acuerdo de cambio conductual concertado en sesión del Comité de Evaluación y Seguimiento, mediante el cual el aprendiz se compromete a realizar acciones reflexivas o de servicio a la comunidad formativa.",
    authority: "Comité de Evaluación y Seguimiento",
    effect: "Seguimiento periódico a 30 días por parte del equipo de Bienestar al Aprendiz. No es una sanción formal.",
    legalBasis: "Acuerdo 0009 de 2024 - Acompañamiento Formativo"
  },
  // Sanciones Disciplinarias
  {
    id: "sanc-escrito",
    type: "sancion",
    classification: "Sanción Disciplinaria",
    title: "1. Llamado de Atención Escrito",
    description: "Sanción disciplinaria formal impuesta por la Subdirección de Centro ante la reiteración de faltas leves habiendo recibido llamados verbales, o ante faltas calificadas como graves.",
    authority: "Subdirector de Centro (mediante acto administrativo motivado)",
    effect: "Se registra con copia a la hoja de vida institucional del aprendiz en el sistema académico.",
    legalBasis: "Acuerdo 0009 de 2024 - Régimen Sancionatorio"
  },
  {
    id: "sanc-condic",
    type: "sancion",
    classification: "Sanción Disciplinaria",
    title: "2. Condicionamiento de Matrícula",
    description: "Estado de prueba disciplinaria en el que se ubica al aprendiz ante faltas graves o reincidencia académica. El aprendiz continúa asistiendo a clases bajo estricta supervisión.",
    authority: "Subdirector de Centro previo concepto del Comité de Evaluación",
    effect: "Pérdida inmediata de beneficios económicos (apoyos de sostenimiento, monitorías o representaciones institucionales). La comisión de una nueva falta deriva en cancelación.",
    legalBasis: "Acuerdo 0009 de 2024 - Condicionamiento"
  },
  {
    id: "sanc-cancela",
    type: "sancion",
    classification: "Sanción Disciplinaria",
    title: "3. Cancelación de Matrícula e Inhabilidad",
    description: "Máxima sanción disciplinaria impuesta por faltas gravísimas comprobadas (porte de armas, drogas, plagio reiterado, violencia física o delitos). Implica la expulsión definitiva del programa.",
    authority: "Subdirector de Centro mediante Resolución motivada",
    effect: "Pérdida irrevocable de la calidad de aprendiz SENA e imposición de inhabilidad legal para matricularse en cualquier programa del SENA por un periodo de seis (6) meses a tres (3) años.",
    legalBasis: "Acuerdo 0009 de 2024 - Inhabilidades Sancionatorias"
  }
];


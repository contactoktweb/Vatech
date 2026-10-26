import type {
  AboutPageContent,
  DistributorsPageContent,
  PhilosophyPageContent,
  ProductPageLabels,
  ProductsPageContent,
  WorldNetworkPageContent,
} from "../types";
import lists from "./world.json";

const mx = (path: string) => `https://vatechmexico.com/wp-content/uploads/${path}`;

export const defaultAbout: AboutPageContent = {
  seo: {
    title: "Quiénes somos",
    description: "VATECH es líder mundial en imagenología digital dental, con más de 20 años de trayectoria. Conoce a VATECH Colombia y por qué elegirnos.",
  },
  hero: {
    eyebrow: "QUIÉNES SOMOS",
    title: "Liderazgo global.",
    highlight: "Presencia local.",
    lead: "Más de 20 años impulsando la imagenología digital dental con una visión centrada en diagnósticos precisos, flujos ágiles y comodidad para el paciente.",
  },
  intro: {
    eyebrow: "INNOVACIÓN DE PRIMER MUNDO",
    title: "Empresa líder en innovación digital dental.",
    paragraphs: [
      "En Vatech nos hemos consolidado como una empresa coreana líder en el sector de la imagenología digital dental. Nuestra misión ha sido trabajar para proveer a odontólogos y pacientes tecnologías seguras que cuiden su salud y mejoren su calidad de vida.",
      "En Vatech Colombia compartimos la visión global de ser pioneros en diagnósticos precisos, flujos de trabajo rápidos y equipos diseñados para la máxima comodidad del paciente.",
    ],
  },
  support: {
    eyebrow: "RESPALDO GLOBAL",
    title: "Una red internacional\nque responde localmente.",
    stats: [
      { value: "7", label: "empresas afiliadas" },
      { value: "29", label: "filiales en el extranjero" },
      { value: "BOG", label: "oficina principal en Bogotá" },
    ],
  },
  reasons: {
    eyebrow: "¿POR QUÉ ELEGIR VATECH?",
    title: "El número 1\nen el mundo.",
    image: { local: "/assets/company/Logo-No.-1.png", source: mx("2023/08/Logo-No.-1.png"), alt: "VATECH número 1" },
    items: [
      "No. 1 en Innovación Digital Dental tanto en Colombia como a nivel mundial.",
      "No. 1 en ventas de equipos de diagnóstico dental 3D.",
      "No. 1 en participación de mercado mundial para sensores intraorales.",
      "No. 1 con la mayor cuota de mercado en software de diagnóstico de rayos X dentales.",
      "No. 1 en Corea y el sudeste asiático, y líderes en equipos 2D en China.",
    ],
  },
};

export const defaultPhilosophy: PhilosophyPageContent = {
  seo: {
    title: "Filosofía VATECH",
    description: "La filosofía de VATECH: tecnología segura y precisa centrada en las personas, para odontólogos y pacientes.",
  },
  hero: {
    eyebrow: "NUESTRA FILOSOFÍA",
    title: "Nuestro viaje",
    highlight: "humanista.",
    lead: "Vatech se esfuerza por hacer del mundo un lugar mejor, colocando a las personas en el centro de su innovación y de su cultura.",
    symbol: "仁",
    symbolCaption: "HUMANISM · PEOPLE FIRST",
  },
  corporate: {
    eyebrow: "FILOSOFÍA INSTITUCIONAL",
    title: "Misión, Visión y\nPolítica de Calidad.",
    text: "Bases estratégicas y valores corporativos que guían nuestra operación, innovación y compromiso permanente con la comunidad odontológica en Colombia.",
    mission: {
      tag: "Propósito Corporativo",
      title: "Misión",
      quote: "Contribuir a la salud y calidad de vida de las personas, proporcionando productos sanitarios innovadores, que posibiliten mejoras en la práctica de los profesionales de la salud en el ámbito odontológico.",
      text: "Guiados por el valor humano, facilitamos herramientas diagnósticas avanzadas que elevan el estándar clínico diario con máxima precisión y la menor dosis de radiación.",
    },
    vision: {
      tag: "Visión Estratégica",
      title: "Visión",
      quote: "Convertirse en empresa referente en el ámbito sanitario con vocación global y reconocida por la innovación, el compromiso y los altos estándares de calidad de sus productos para el cuidado de la salud y el bienestar de las personas, dando respuesta a sus necesidades actuales y futuras.",
      text: "Consolidar el liderazgo tecnológico en Colombia mediante acompañamiento directo, garantía de fábrica y capacitación continua para los especialistas del país.",
    },
    quality: {
      tag: "Calidad y Excelencia",
      title: "Política de Calidad",
      text: "Nos especializamos en la importación y comercialización de dispositivos médicos y sistemas radiológicos de vanguardia, cumpliendo rigurosamente los estándares sanitarios y satisfaciendo plenamente las expectativas de nuestros clientes mediante procesos sistemáticos de mejora continua.",
      checklist: [
        "Certificación biomédica y calibración de fábrica",
        "Cumplimiento riguroso de protección radiológica",
        "Respaldo oficial directo y garantía de fábrica",
      ],
    },
    values: {
      tag: "Principios y Cultura",
      title: "Valores",
      items: [
        { title: "Innovación con Sentido Humano", text: "Tecnología pionera orientada al cuidado de la salud y mínima radiación (Green Low Dose)." },
        { title: "Compromiso Sanitario", text: "Prioridad incondicional en la seguridad, precisión diagnóstica y confort del paciente." },
        { title: "Altos Estándares de Calidad", text: "Dispositivos biomédicos certificados con respaldo oficial directo en Colombia." },
        { title: "Integridad y Mejora Continua", text: "Relaciones transparentes, servicio confiable y evolución tecnológica constante." },
      ],
    },
  },
  intro: {
    eyebrow: "UNA IDEA QUE GUÍA EL VIAJE",
    title: "Esto es, por el bien del pueblo.",
    text: "La dirección de la empresa, el porqué de la innovación y la forma de relacionarse con empleados, clientes y pacientes se conectan en una misma idea: crecer sin perder de vista el valor humano.",
  },
  stageLabel: "ETAPA",
  stages: [
    {
      title: "Humanismo: El Llamado",
      quote: "Las personas son la base de todo.",
      text: "La filosofía de Vatech parte de una profunda preocupación por las personas. Inspirado por el pensamiento de Confucio, Changjun Ro impulsó una empresa que prioriza la salud humana, el aprendizaje constante y la responsabilidad con empleados, clientes y pacientes.",
      image: { local: "/assets/philosophy/1.png", source: mx("2025/03/1.png"), alt: "Historia y filosofía VATECH" },
    },
    {
      title: "Humanismo: La Lucha",
      quote: "No. 1 en el mundo a través de la innovación tecnológica.",
      text: "Las crisis y la competencia reforzaron una idea: la sostenibilidad debía construirse mediante innovación real. Ese camino condujo al desarrollo de soluciones pioneras y a la decisión de competir globalmente desde la tecnología dental digital.",
      image: { local: "/assets/philosophy/4-441x1024.png", source: mx("2025/03/4-441x1024.png"), alt: "Historia y filosofía VATECH" },
    },
    {
      title: "Humanismo: La Evolución",
      quote: "Innovación centrada en las personas.",
      text: "La evolución tecnológica de Vatech se vincula con una práctica activa de cuidado: reducir barreras, apoyar a clientes y profesionales, fortalecer la colaboración y convertir la innovación en una herramienta para mejorar la experiencia y la salud del paciente.",
      image: { local: "/assets/philosophy/9.png", source: mx("2025/03/9.png"), alt: "Historia y filosofía VATECH" },
    },
    {
      title: "Humanismo: El Ascenso",
      quote: "Existo a través de los demás.",
      text: "La siguiente etapa explora relaciones humanas saludables, solidaridad y crecimiento personal. Programas como Compraxis, la peregrinación a Shikoku y la biblioteca interna reflejan una cultura que busca equilibrio entre comunidad, reflexión e independencia.",
      image: { local: "/assets/philosophy/13.png", source: mx("2025/03/13.png"), alt: "Historia y filosofía VATECH" },
    },
  ],
  epilogue: {
    eyebrow: "EPÍLOGO",
    title: "El camino encontrado\nen el silencio.",
    text: "En medio de decisiones, competencia y responsabilidades, la reflexión vuelve a una pregunta esencial: ¿qué nos motiva? Para Vatech, la respuesta termina regresando a las personas y al significado que existe detrás de la innovación.",
  },
};

export const defaultWorld: WorldNetworkPageContent = {
  seo: {
    title: "Red mundial VATECH",
    description: "Oficinas y filiales de VATECH en América, Europa, Asia y Latinoamérica, incluida la sede de VATECH Colombia en Bogotá.",
  },
  hero: {
    eyebrow: "VATECH EN EL MUNDO",
    title: "Una organización",
    highlight: "verdaderamente global.",
    lead: "Fundada en 1992 y con sede en Corea del Sur, Vatech ha expandido su presencia mediante filiales, oficinas y redes de distribución en América, Europa, Asia y Latinoamérica.",
    badge: "+70",
  },
  intro: {
    eyebrow: "RED INTERNACIONAL",
    title: "Conoce la red de oficinas alrededor del mundo.",
    text: "Una infraestructura internacional conecta la innovación desarrollada por Vatech con especialistas, distribuidores y equipos de soporte en múltiples regiones.",
  },
  offices: lists.offices,
  quote: "Uniendo tecnología y cuidado humano en cada rincón del planeta.",
};

export const defaultDistributors: DistributorsPageContent = {
  seo: {
    title: "Distribuidores oficiales en Colombia",
    description: "Red nacional de distribuidores autorizados VATECH en Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Eje Cafetero y Cartagena.",
  },
  hero: {
    eyebrow: "RED DE DISTRIBUIDORES",
    title: "Distribuidores oficiales",
    highlight: "en Colombia.",
    lead: "Nuestra red de distribuidores autorizados en Colombia te brinda acceso directo a todo el portafolio de sistemas radiológicos 2D/3D VATECH, con cobertura y acompañamiento en las principales regiones del país.",
    badge: "CO",
  },
  directory: {
    eyebrow: "RED NACIONAL",
    title: "Distribuidores Autorizados en Colombia",
    coverageLabel: "regiones con cobertura",
    regions: lists.regions,
  },
  join: {
    eyebrow: "ALIANZA ESTRATÉGICA · COLOMBIA",
    title: "¿Quieres ser distribuidor de VATECH?",
    text: "Forma parte de la red oficial de la marca líder global en imagenología dental. Ofrecemos respaldo directo de fábrica, inventario local en Colombia, capacitación técnica certificada y soporte comercial de primer nivel.",
    benefits: [
      { title: "Portafolio Global Reconocido", text: "Equipos tomográficos 3D CBCT (A9, Green X), panorámicos 2D PaX-i, rayos X portátiles EzRay Air y sensores EzSensor." },
      { title: "Soporte Técnico de Fábrica", text: "Sede propia en Bogotá (Teleport Business Park) con stock permanente de repuestos originales e ingenieros certificados." },
      { title: "Condiciones Comerciales Preferenciales", text: "Márgenes competitivos, acompañamiento preventa para proyectos clínicos y material promocional institucional." },
      { title: "Capacitación y Certificación", text: "Entrenamiento continuo tanto para tus asesores comerciales como para tu personal de ingeniería y servicio técnico." },
    ],
    whatsappLabel: "WhatsApp Directo:",
    whatsappMessage: "Hola, Quiero ser distribuidor de Vatech",
    emailLabel: "Correo Oficial:",
    emailSubject: "Solicitud: Quiero ser distribuidor de Vatech",
  },
  form: {
    badge: "POSTULACIÓN DE DISTRIBUIDOR",
    title: "Formulario de Distribución",
    text: "Déjanos tus datos comerciales y nuestro equipo evaluará tu perfil para integrarte a la red autorizada VATECH Colombia.",
    fields: {
      name: { label: "Nombre o Razón Social", placeholder: "Ej: Distribuciones Médicas / Dr. Carlos Méndez" },
      email: { label: "Correo Electrónico", placeholder: "contacto@tuempresa.com" },
      phone: { label: "Celular / WhatsApp", placeholder: "+57 300 123 4567" },
      city: { label: "Ciudad y Departamento", placeholder: "Ej: Barranquilla, Atlántico / Cali, Valle" },
      message: { label: "Mensaje o Información de tu Empresa", placeholder: "Cuéntanos brevemente sobre tu empresa, experiencia en el sector dental o zonas en las que te interesa distribuir..." },
    },
    whatsappButton: "Enviar por WhatsApp Comercial",
    emailButton: "Enviar por Correo Electrónico",
    submittingLabel: "Procesando solicitud...",
    requiredError: "Por favor completa los campos requeridos.",
    disclaimer: "Al enviar este formulario aceptas el tratamiento confidencial de tus datos para fines de evaluación comercial por parte de VATECH Colombia.",
    whatsappIntro: "Hola, Quiero ser distribuidor de Vatech",
    successTitle: "¡Solicitud Preparada con Éxito!",
    successText: "Hemos registrado tus datos. Para mayor agilidad, puedes continuar la conversación directamente por WhatsApp o confirmar por correo electrónico:",
    successWhatsapp: "Abrir WhatsApp Comercial",
    successEmail: "Enviar por Correo a",
    resetLabel: "Enviar otra postulación",
  },
  cta: {
    eyebrow: "¿NECESITAS ASESORÍA?",
    title: "Encuentra el distribuidor VATECH más cercano a tu clínica.",
    text: "Contáctanos directamente y te comunicaremos de inmediato con el representante autorizado de tu ciudad en Colombia.",
    buttonLabel: "Contactar por WhatsApp",
    whatsappMessage: "Hola VATECH Colombia, me gustaría contactar a un distribuidor autorizado en mi ciudad.",
  },
};

export const defaultProductsPage: ProductsPageContent = {
  seo: {
    title: "Productos: tomógrafos 3D, panorámicos 2D y sensores intraorales",
    description: "Catálogo VATECH en Colombia: tomógrafos CBCT Green X y A9, panorámicos PaX-i, sensores EzSensor, rayos X portátiles EzRay Air y software Ez3D-i, EzDent-i y EzOrtho.",
  },
  hero: {
    eyebrow: "PRODUCTOS VATECH",
    title: "Imagen digital",
    highlight: "sin límites.",
    lead: "Explora nuestros sistemas de imagen digital más avanzados: desde soluciones 2D y 3D, hasta equipos intraorales.",
    image: { local: "/assets/products/X18X16.png", source: mx("2026/07/X18X16.png"), alt: "Green X16 y Green X18" },
    anchors: [
      { label: "Equipos", href: "#equipos" },
      { label: "Comparativa 3D", href: "#comparativa-3d" },
      { label: "Software", href: "#software" },
    ],
    labels: ["3D · CBCT", "DENTAL IMAGING"],
  },
  catalog: {
    eyebrow: "EQUIPOS VATECH",
    title: "Precisión diseñada\npara cada diagnóstico.",
    text: "Selecciona una categoría para explorar el portafolio de sistemas VATECH.",
    tabs: { threeD: "Sistema de imagen 3D", twoD: "Sistema de imagen 2D", intraoral: "Sistema intraoral" },
    exploreLabel: "Explorar equipo",
    comingSoonLabel: "PRÓXIMAMENTE",
    teaserLabel: "Ver adelanto oficial",
  },
  comparison: {
    eyebrow: "SISTEMAS DE IMAGEN 3D · COMPARATIVA",
    title: "¿Qué modelo se adapta mejor a tu clínica?",
    text: "Compara los equipos tomográficos CBCT disponibles en el portafolio de VATECH Colombia y encuentra la solución óptima para tu especialidad.",
    scrollHint: "Desliza horizontalmente para comparar especificaciones",
    columns: {
      model: "MODELO",
      fov: "TAMAÑO DEL FOV",
      voxel: "TAMAÑO DEL VOXEL",
      exposure: "TIEMPO MÍN. DE EXPOSICIÓN",
      use: "USO RECOMENDADO",
      action: "ACCIÓN",
    },
    actionLabel: "Pedir información",
    teaserLabel: "Ver Teaser",
    whatsappMessage: "Hola VATECH Colombia, me gustaría recibir asesoría técnica y cotización del equipo tomográfico {producto}.",
    whatsappComingSoonMessage: "Hola VATECH Colombia, me gustaría recibir información sobre el próximo lanzamiento del tomógrafo {producto} en Colombia.",
    rows: [
      { name: "A9", fov: "8x8 cm (Anatómico 9.3x8 cm)", voxel: "Desde 200 µm hasta 300 µm", exposure: ["1,9s CEPH", "18s CBCT", "11,9s PANO"], recommendedUse: "Diagnóstico general 3 en 1, planificación de implantes y endodoncia esencial.", href: "/productos/a9" },
      { name: "Green X 12", fov: "Desde 4x4cm hasta 12x8.5cm", voxel: "Desde 49.5 µm hasta 300 µm", exposure: ["1,9s CEPH", "10s CBCT", "4,0s PANO"], recommendedUse: "Implantología guiada, endodoncia de alta resolución (Endo 4x4) y diagnóstico 3D integral.", href: "/productos/green-x12" },
      { name: "Green X-12 SE", fov: "Desde 4x4cm hasta 12x8.5cm", voxel: "Desde 49.5 µm hasta 300 µm", exposure: ["1,9s CEPH", "10s CBCT", "4,0s PANO"], recommendedUse: "Clínicas en crecimiento que requieren diagnóstico 4 en 1 con escaneo de modelos 3D y tecnología CST.", href: "/productos/green-x-12-se" },
      { name: "Green X 16", fov: "Desde 4x4cm hasta 16x9cm", voxel: "Desde 49.5 µm hasta 300 µm", exposure: ["1,9s CEPH", "2,9s CBCT", "3,9s PANO"], recommendedUse: "Equipo dirigido para endodoncistas e implantólogos.", href: "/productos/green-x16" },
      { name: "Green X 18", fov: "Desde 12x9cm hasta 18x10cm", voxel: "Desde 49.5 µm hasta 300 µm", exposure: ["1,9s CEPH", "2,9s CBCT", "3,9s PANO"], recommendedUse: "Equipo dirigido para especialistas de ATM, periodoncistas y cirugía maxilofacial.", href: "/productos/green-x18" },
      { name: "Green X 21", badge: "PRÓXIMAMENTE", fov: "Desde 4x4cm hasta 21x19cm", voxel: "Desde 49.5 µm hasta 300 µm", exposure: ["0,9s CEPH", "2,9s CBCT", "7,3s PANO"], recommendedUse: "Diagnóstico avanzado, cirugía guiada, ortodoncia y Face Scan.", href: "/productos/green-x21", isComingSoon: true, showTeaser: true },
    ],
  },
  teaser: {
    eyebrow: "AVANCE EXCLUSIVO",
    title: "Green X 21 · El futuro del diagnóstico CBCT",
    text: "El nuevo Green X21 con la máxima amplitud en diagnóstico 3D (FOV expandido hasta 21x19 cm) y tecnología de escaneo facial llegará próximamente a Colombia. No te pierdas el adelanto exclusivo:",
    badge: "PRÓXIMAMENTE EN COLOMBIA",
    image: { local: "/assets/products/X21-scaled.webp", source: mx("2026/03/X21-scaled.png"), alt: "VATECH Green X21 Próximamente" },
    video: {
      local: "/Recursos/" + encodeURIComponent("Confidential_Green X 21 Teaser video.mp4"),
      source: "/Recursos/" + encodeURIComponent("Confidential_Green X 21 Teaser video.mp4"),
    },
    footerText: "Sé el primero en recibir notificación de lanzamiento y condiciones de preventa.",
    buttonLabel: "Avísame cuando esté disponible",
    productName: "Green X21",
    modalTitle: "Green X21 · Video Teaser Oficial",
  },
  software: {
    eyebrow: "SOFTWARE ESPECIALIZADO",
    title: "Eleva tu diagnóstico con la excelencia\nde nuestros softwares 2D y 3D.",
    text: "Herramientas clínicas de alta precisión para visualización 3D, simulación de implantes, ortodoncia y gestión.",
    moreLabel: "Más información",
    previewLabel: "Ver adelanto",
    comingSoonLabel: "PRÓXIMAMENTE",
  },
  finalCta: {
    eyebrow: "VATECH COLOMBIA",
    title: "Encuentra la tecnología\nideal para tu práctica.",
    buttonLabel: "Hablar con un especialista",
  },
  get detailLabels() {
    return defaultProductLabels;
  },
};

export const defaultProductLabels: ProductPageLabels = {
  comingSoonShort: "PRÓXIMAMENTE",
  comingSoonPill: "Próximamente",
  teaserButton: "Ver video teaser",
  notifyButton: "Avísame cuando esté disponible",
  preorderShort: "Pedir información de preventa",
  comingSoonBadge: "PRÓXIMAMENTE EN COLOMBIA",
  comingSoonFallback: "Próximamente disponible en Colombia. Muy pronto compartiremos todos los detalles y fechas oficiales de disponibilidad en el país.",
  preorderText: "¿Deseas ser de los primeros en conocer el lanzamiento y condiciones en Colombia?",
  preorderButton: "Pedir información de preventa por WhatsApp",
  preorderMessage: "Hola VATECH Colombia, me gustaría recibir información sobre el próximo lanzamiento de {producto} en Colombia.",
  introTitle: "Diseñado para ver\nmás y decidir mejor.",
  specsLabel: "DATOS TÉCNICOS",
  specsTitle: "Especificaciones.",
  galleryLabel: "DETALLE VISUAL",
  galleryTitle: "Explora cada detalle.",
  videoLabel: "VIDEO DEL PRODUCTO",
  videoTitleSingle: "Conoce el producto en acción.",
  videoTitleMultiple: "Videos, demostraciones y capacitación.",
  catalogLabel: "DOCUMENTACIÓN",
  catalogTitle: "Consulta el catálogo\ncompleto.",
  catalogButton: "Descargar catálogo PDF",
  contactEyebrow: "VATECH COLOMBIA",
  contactTitle: "¿Quieres conocer\neste equipo?",
  contactButton: "Hablar con un especialista",
  relatedLabel: "TAMBIÉN PUEDE INTERESARTE",
  relatedTitle: "Más soluciones VATECH.",
  primaryButton: "Ver características",
  secondaryButton: "Solicitar información",
};

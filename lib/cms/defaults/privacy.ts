import type { PrivacyPageContent } from "../types";

// Política de tratamiento de datos personales (Ley 1581 de 2012 y Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015)
export const defaultPrivacy: PrivacyPageContent = {
  seo: {
    title: "Política de privacidad y tratamiento de datos",
    description: "Cómo VATECH Colombia recolecta, usa, comparte y protege los datos personales de quienes nos contactan, y cómo ejercer sus derechos.",
  },
  hero: {
    eyebrow: "INFORMACIÓN LEGAL",
    title: "Política de privacidad y tratamiento de datos",
    lead: "Cómo recolectamos, usamos y protegemos sus datos personales, y cómo puede ejercer sus derechos como titular.",
  },
  updated: "17 de noviembre de 2026",
  intro: [
    "En VATECH Colombia respetamos la privacidad de las personas que nos contactan. Esta política explica cómo tratamos los datos personales que recibimos a través de este sitio web y de nuestros canales de atención, de acuerdo con la Ley 1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015) y las demás normas colombianas sobre protección de datos personales.",
    "Al enviar sus datos en cualquiera de nuestros formularios y marcar la casilla de autorización, usted acepta el tratamiento descrito en esta política.",
  ],
  sections: [
    {
      title: "Responsable del tratamiento",
      paragraphs: ["VATECH Colombia, representante en Colombia de VATECH, fabricante de equipos de imagenología dental."],
      items: [
        "Dirección: Cra. 7 # 113-43, Oficina 805, Torre Teleport Business Park, Bogotá, Colombia.",
        "Correo: marketing.colombia@vatechglobal.com",
        "WhatsApp: +57 312 6344188",
      ],
    },
    {
      title: "Datos que recolectamos",
      paragraphs: ["Solo pedimos los datos necesarios para atender su solicitud:"],
      items: [
        "Nombre completo o razón social.",
        "Correo electrónico y número de celular o WhatsApp.",
        "Ciudad o región.",
        "Equipo o producto de interés y el mensaje que nos envíe.",
      ],
    },
    {
      title: "Para qué usamos sus datos",
      paragraphs: [],
      items: [
        "Responder solicitudes de información y cotizaciones.",
        "Enviarle los catálogos y la información de los productos que solicite.",
        "Contactarlo por correo, teléfono o WhatsApp para dar seguimiento a su solicitud.",
        "Gestionar las solicitudes de quienes quieren ser distribuidores.",
        "Informarle sobre productos, lanzamientos, capacitaciones y eventos de VATECH.",
        "Elaborar estadísticas internas para mejorar nuestro servicio.",
      ],
    },
    {
      title: "Con quién compartimos sus datos",
      paragraphs: [
        "Con su autorización, podemos compartir sus datos con VATECH Global y sus empresas relacionadas, y con los distribuidores autorizados de VATECH en Colombia, únicamente para atender su solicitud, ofrecerle asesoría comercial y servicio técnico.",
        "También usamos proveedores tecnológicos (alojamiento del sitio web y envío de correos) que tratan los datos por cuenta nuestra y bajo condiciones de seguridad y confidencialidad. Cuando los datos se transfieran o transmitan fuera de Colombia, se hará conforme a la ley colombiana.",
        "No vendemos ni alquilamos sus datos personales.",
      ],
      items: [],
    },
    {
      title: "Sus derechos como titular",
      paragraphs: ["Usted puede, en cualquier momento y de forma gratuita:"],
      items: [
        "Conocer, actualizar y rectificar sus datos personales.",
        "Solicitar prueba de la autorización que nos dio.",
        "Ser informado sobre el uso que les hemos dado a sus datos.",
        "Revocar la autorización o pedir que eliminemos sus datos, cuando no exista un deber legal o contractual de conservarlos.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley de protección de datos.",
      ],
    },
    {
      title: "Cómo ejercer sus derechos",
      paragraphs: [
        "Escríbanos a marketing.colombia@vatechglobal.com indicando su nombre, sus datos de contacto y su solicitud.",
        "Las consultas se responden en un máximo de diez (10) días hábiles y los reclamos en un máximo de quince (15) días hábiles, contados desde el día siguiente a su recibo. Si no es posible responder en ese plazo, le informaremos el motivo y la nueva fecha, conforme a la ley.",
      ],
      items: [],
    },
    {
      title: "Seguridad y conservación",
      paragraphs: [
        "Aplicamos medidas técnicas y administrativas razonables para proteger sus datos contra pérdida, uso o acceso no autorizado.",
        "Conservamos sus datos mientras sean necesarios para las finalidades descritas o mientras exista una relación comercial, y luego los eliminamos, salvo que la ley exija conservarlos.",
      ],
      items: [],
    },
    {
      title: "Datos sensibles y menores de edad",
      paragraphs: ["En este sitio no solicitamos datos sensibles ni datos de menores de edad. Le pedimos no incluirlos en los mensajes que nos envíe."],
      items: [],
    },
    {
      title: "Cambios a esta política",
      paragraphs: [
        "Podemos actualizar esta política. Cualquier cambio se publicará en esta página con su fecha de actualización. Esta política rige desde su publicación.",
      ],
      items: [],
    },
  ],
};

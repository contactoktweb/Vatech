"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188";
const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "+57 312 6344188";
const TARGET_EMAIL = process.env.NEXT_PUBLIC_DISTRIBUTOR_EMAIL || "marketing.colombia@vatechglobal.com";

export default function DistributorForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    celular: "",
    ciudad: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const buildWhatsAppUrl = (data: typeof formData) => {
    const text = [
      "Hola, Quiero ser distribuidor de Vatech",
      "",
      `*Nombre / Empresa:* ${data.nombre}`,
      `*Correo:* ${data.correo}`,
      `*Celular:* ${data.celular}`,
      `*Ciudad:* ${data.ciudad}`,
      data.mensaje ? `*Mensaje:* ${data.mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoUrl = (data: typeof formData) => {
    const subject = `Solicitud: Quiero ser distribuidor de Vatech - ${data.nombre}`;
    const body = [
      "Hola equipo de VATECH Colombia,",
      "",
      "Quiero ser distribuidor de Vatech en Colombia.",
      "",
      "DATOS DE CONTACTO:",
      `- Nombre / Empresa: ${data.nombre}`,
      `- Correo Electrónico: ${data.correo}`,
      `- Celular / WhatsApp: ${data.celular}`,
      `- Ciudad / Región: ${data.ciudad}`,
      data.mensaje ? `- Mensaje / Información: ${data.mensaje}` : "",
      "",
      "Quedo atento(a) a su respuesta para coordinar los siguientes pasos.",
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, channel: "whatsapp" | "email" = "whatsapp") => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.celular || !formData.ciudad) {
      setErrorMessage("Por favor completa los campos requeridos.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Registrar lead en la API para trazabilidad interna
      await fetch("/api/distribuidor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus("success");

      // Abrir canal elegido
      if (channel === "whatsapp") {
        window.open(buildWhatsAppUrl(formData), "_blank", "noopener,noreferrer");
      } else {
        window.location.href = buildMailtoUrl(formData);
      }
    } catch {
      // Incluso ante error de red en API, el canal directo (WhatsApp/Mailto) debe funcionar
      setStatus("success");
      if (channel === "whatsapp") {
        window.open(buildWhatsAppUrl(formData), "_blank", "noopener,noreferrer");
      } else {
        window.location.href = buildMailtoUrl(formData);
      }
    }
  };

  return (
    <div className="distributor-form-card">
      <div className="distributor-form-header">
        <span className="distributor-form-pill">POSTULACIÓN DE DISTRIBUIDOR</span>
        <h3>Formulario de Distribución</h3>
        <p>
          Déjanos tus datos comerciales y nuestro equipo evaluará tu perfil para integrarte a la red autorizada VATECH Colombia.
        </p>
      </div>

      {status === "success" ? (
        <div className="distributor-form-success">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h4>¡Solicitud Preparada con Éxito!</h4>
          <p>
            Hemos registrado tus datos. Para mayor agilidad, puedes continuar la conversación directamente por WhatsApp o confirmar por correo electrónico:
          </p>
          <div className="success-actions">
            <a
              href={buildWhatsAppUrl(formData)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Abrir WhatsApp Comercial ({WHATSAPP_DISPLAY}) →
            </a>
            <a
              href={buildMailtoUrl(formData)}
              className="btn btn-outline"
            >
              Enviar por Correo a {TARGET_EMAIL} ✉
            </a>
          </div>
          <button
            type="button"
            className="btn-link-reset"
            onClick={() => {
              setStatus("idle");
              setFormData({ nombre: "", correo: "", celular: "", ciudad: "", mensaje: "" });
            }}
          >
            Enviar otra postulación
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e, "whatsapp")} className="distributor-form">
          {status === "error" && errorMessage && (
            <div className="form-alert-error" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="dist-nombre">
              Nombre o Razón Social <span className="req">*</span>
            </label>
            <input
              id="dist-nombre"
              name="nombre"
              type="text"
              required
              placeholder="Ej: Distribuciones Médicas / Dr. Carlos Méndez"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="dist-correo">
                Correo Electrónico <span className="req">*</span>
              </label>
              <input
                id="dist-correo"
                name="correo"
                type="email"
                required
                placeholder="contacto@tuempresa.com"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dist-celular">
                Celular / WhatsApp <span className="req">*</span>
              </label>
              <input
                id="dist-celular"
                name="celular"
                type="tel"
                required
                placeholder="+57 300 123 4567"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dist-ciudad">
              Ciudad y Departamento <span className="req">*</span>
            </label>
            <input
              id="dist-ciudad"
              name="ciudad"
              type="text"
              required
              placeholder="Ej: Barranquilla, Atlántico / Cali, Valle"
              value={formData.ciudad}
              onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dist-mensaje">
              Mensaje o Información de tu Empresa <span className="req">*</span>
            </label>
            <textarea
              id="dist-mensaje"
              name="mensaje"
              rows={4}
              required
              placeholder="Cuéntanos brevemente sobre tu empresa, experiencia en el sector dental o zonas en las que te interesa distribuir..."
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
            />
          </div>

          <div className="form-actions-split">
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Procesando solicitud..." : "Enviar por WhatsApp Comercial →"}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-full"
              disabled={status === "submitting"}
              onClick={(e) => {
                const fakeEvent = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
                handleSubmit(fakeEvent, "email");
              }}
            >
              Enviar por Correo Electrónico ✉
            </button>
          </div>

          <p className="form-disclaimer">
            Al enviar este formulario aceptas el tratamiento confidencial de tus datos para fines de evaluación comercial por parte de VATECH Colombia.
          </p>
        </form>
      )}
    </div>
  );
}

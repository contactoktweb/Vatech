"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useSiteSettings } from "./SiteSettingsProvider";
import { CheckIcon, MailIcon } from "./icons";
import type { DistributorsPageContent } from "@/lib/cms/types";

export default function DistributorForm({ content: c }: { content: DistributorsPageContent["form"] }) {
  const { contact } = useSiteSettings();
  const WHATSAPP_NUMBER = contact.whatsappNumber;
  const WHATSAPP_DISPLAY = contact.phoneDisplay;
  const TARGET_EMAIL = process.env.NEXT_PUBLIC_DISTRIBUTOR_EMAIL || contact.email;

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    celular: "",
    ciudad: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const buildWhatsAppUrl = (data: typeof formData) => {
    const text = [
      c.whatsappIntro,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>, channel: "whatsapp" | "email" = "whatsapp") => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.celular || !formData.ciudad) {
      setErrorMessage(c.requiredError);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // El correo al equipo de mercadeo se envía en segundo plano; el canal elegido se abre de inmediato
    fetch("/api/distribuidor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, sitio_web: honeypot }),
      keepalive: true,
    }).catch(() => {});

    setStatus("success");
    if (channel === "whatsapp") {
      window.open(buildWhatsAppUrl(formData), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = buildMailtoUrl(formData);
    }
  };

  return (
    <div className="distributor-form-card">
      <div className="distributor-form-header">
        <span className="distributor-form-pill">{c.badge}</span>
        <h3>{c.title}</h3>
        <p>{c.text}</p>
      </div>

      {status === "success" ? (
        <div className="distributor-form-success">
          <div className="success-icon" aria-hidden="true"><CheckIcon size={22} /></div>
          <h4>{c.successTitle}</h4>
          <p>{c.successText}</p>
          <div className="success-actions">
            <a
              href={buildWhatsAppUrl(formData)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {c.successWhatsapp} ({WHATSAPP_DISPLAY}) →
            </a>
            <a
              href={buildMailtoUrl(formData)}
              className="btn btn-outline"
            >
              {c.successEmail} {TARGET_EMAIL} <MailIcon size={16} />
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
            {c.resetLabel}
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e, "whatsapp")} className="distributor-form">
          {status === "error" && errorMessage && (
            <div className="form-alert-error" role="alert">
              {errorMessage}
            </div>
          )}

          <input
            className="form-honeypot"
            name="sitio_web"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />

          <div className="form-group">
            <label htmlFor="dist-nombre">
              {c.fields.name.label} <span className="req">*</span>
            </label>
            <input
              id="dist-nombre"
              name="nombre"
              type="text"
              required
              placeholder={c.fields.name.placeholder}
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="dist-correo">
                {c.fields.email.label} <span className="req">*</span>
              </label>
              <input
                id="dist-correo"
                name="correo"
                type="email"
                required
                placeholder={c.fields.email.placeholder}
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dist-celular">
                {c.fields.phone.label} <span className="req">*</span>
              </label>
              <input
                id="dist-celular"
                name="celular"
                type="tel"
                required
                placeholder={c.fields.phone.placeholder}
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dist-ciudad">
              {c.fields.city.label} <span className="req">*</span>
            </label>
            <input
              id="dist-ciudad"
              name="ciudad"
              type="text"
              required
              placeholder={c.fields.city.placeholder}
              value={formData.ciudad}
              onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dist-mensaje">
              {c.fields.message.label} <span className="req">*</span>
            </label>
            <textarea
              id="dist-mensaje"
              name="mensaje"
              rows={4}
              required
              placeholder={c.fields.message.placeholder}
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
              {status === "submitting" ? c.submittingLabel : `${c.whatsappButton} →`}
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
              {c.emailButton} <MailIcon size={16} />
            </button>
          </div>

          <p className="form-disclaimer">{c.disclaimer}</p>
        </form>
      )}
    </div>
  );
}

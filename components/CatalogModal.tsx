"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import ConsentCheckbox from "./ConsentCheckbox";
import { CheckIcon, DownloadIcon } from "./icons";
import { withProduct } from "@/lib/cms/text";
import type { ProductPageLabels } from "@/lib/cms/types";

// Los datos se recuerdan en este navegador para no pedirlos de nuevo en otra ficha
const STORAGE_KEY = "vatech_catalog_lead";
const EMPTY = { nombre: "", correo: "", celular: "", ciudad: "" };

type Props = { productSlug: string; productName: string; pdfUrl?: string; labels: ProductPageLabels; onClose: () => void };

export default function CatalogModal({ productSlug, productName, pdfUrl, labels: L, onClose }: Props) {
  const [data, setData] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved) setData({ ...EMPTY, ...saved });
    } catch {}
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/catalogo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, producto: productSlug, autorizacion: "si", sitio_web: honeypot }),
      });
      // Un dato inválido se corrige en el formulario; si falla el envío del correo, igual se entrega el catálogo
      if (res.status === 400) {
        const { error: message } = await res.json().catch(() => ({ error: "" }));
        setError(message || "Revisa los datos del formulario.");
        setStatus("idle");
        return;
      }
    } catch {}
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
    setStatus("done");
  };

  const input = (key: keyof typeof EMPTY, label: string, type: string, autoComplete: string) => (
    <div className="form-group">
      <label htmlFor={`catalog-${key}`}>{label}</label>
      <input
        id={`catalog-${key}`}
        name={key}
        type={type}
        required
        autoComplete={autoComplete}
        value={data[key]}
        onChange={(e) => setData({ ...data, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="catalog-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="catalog-modal-title" onClick={onClose}>
      <div className="catalog-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="catalog-modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <p className="eyebrow red">{productName}</p>

        {status === "done" ? (
          <div className="catalog-modal-done">
            <div className="done-icon"><CheckIcon size={26} /></div>
            <h3 id="catalog-modal-title">{L.catalogReadyTitle}</h3>
            <p>{withProduct(pdfUrl ? L.catalogReadyText : L.catalogPendingText, productName)}</p>
            {pdfUrl && (
              <a className="btn btn-primary" href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                {L.catalogFormSubmit} <DownloadIcon size={16} />
              </a>
            )}
          </div>
        ) : (
          <>
            <h3 id="catalog-modal-title">{L.catalogFormTitle}</h3>
            <p>{withProduct(L.catalogFormText, productName)}</p>
            <form onSubmit={submit}>
              <input className="form-honeypot" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              {input("nombre", L.catalogFormName, "text", "name")}
              <div className="form-row">
                {input("correo", L.catalogFormEmail, "email", "email")}
                {input("celular", L.catalogFormPhone, "tel", "tel")}
              </div>
              {input("ciudad", L.catalogFormCity, "text", "address-level2")}
              <ConsentCheckbox />
              {error && <div className="catalog-modal-error" role="alert">{error}</div>}
              <button type="submit" className="btn btn-primary submit-btn" disabled={status === "sending"}>
                {status === "sending" ? "Enviando…" : L.catalogFormSubmit} <DownloadIcon size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

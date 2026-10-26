import { Fragment } from "react";
import type { ReactNode } from "react";

/** Texto con saltos de línea: cada Enter escrito en Sanity se muestra como <br />. */
export function Lines({ text }: { text?: string }) {
  if (!text) return null;
  const lines = text.split("\n");
  return <>{lines.map((line, i) => <Fragment key={i}>{line}{i < lines.length - 1 && <br />}</Fragment>)}</>;
}

/** Texto donde **palabras** se muestran en negrita. */
export function Rich({ text }: { text?: string }): ReactNode {
  if (!text) return null;
  return <>{text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>))}</>;
}

/** Reemplaza {producto} en un mensaje. */
export const withProduct = (template: string, product: string) => template.replaceAll("{producto}", product);

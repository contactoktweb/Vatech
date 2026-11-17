"use client";

import Link from "next/link";
import { useSiteSettings } from "./SiteSettingsProvider";

/** Casilla obligatoria de autorización de tratamiento de datos (Ley 1581 de 2012). Se envía como `autorizacion`. */
export default function ConsentCheckbox({ checked, onChange }: { checked?: boolean; onChange?: (checked: boolean) => void }) {
  const { consent } = useSiteSettings();
  const controlled = checked !== undefined;
  return (
    <label className="consent-check">
      <input
        type="checkbox"
        name="autorizacion"
        value="si"
        required
        {...(controlled ? { checked, onChange: (e) => onChange?.(e.target.checked) } : {})}
      />
      <span>
        {consent.text}{" "}
        <Link href="/politica-de-privacidad" target="_blank">{consent.linkLabel}</Link>.
      </span>
    </label>
  );
}

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "../../../sanity/env";

export default function Studio() {
  if (!isSanityConfigured) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "system-ui, sans-serif", background: "#101112", color: "#f3f3f4", padding: 24 }}>
        <div style={{ maxWidth: 520, lineHeight: 1.6 }}>
          <h1 style={{ fontSize: 24, margin: "0 0 12px" }}>Falta conectar Sanity</h1>
          <p style={{ margin: "0 0 12px", color: "#b9bbc0" }}>
            Agrega <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> y <code>NEXT_PUBLIC_SANITY_DATASET</code> en <code>.env.local</code> (o en Vercel) y vuelve a iniciar el sitio.
          </p>
          <p style={{ margin: 0, color: "#b9bbc0" }}>Los pasos completos están en <code>docs/SANITY.md</code>.</p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}

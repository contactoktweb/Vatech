import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // El administrador de contenido vive en /admin; los enlaces viejos a /studio siguen funcionando
  async redirects() {
    return [
      { source: "/studio", destination: "/admin", permanent: true },
      { source: "/studio/:path*", destination: "/admin/:path*", permanent: true },
      // El sitio ya está publicado: la antigua página «en construcción» lleva al inicio
      { source: "/en-construccion", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

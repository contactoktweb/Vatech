import type { Metadata } from "next";
import MediaPage from "../../components/MediaPage";

export const metadata: Metadata = {
  title: "Media | VATECH México",
  description: "Promociones, noticias, fotografías y videos de VATECH México.",
};

export default function Page(){ return <MediaPage/>; }

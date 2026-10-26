// Forma del contenido editable del sitio. La usan los textos por defecto (lib/cms/defaults),
// las consultas a Sanity (sanity/lib/queries) y los componentes.

/** Imagen: `local` es la URL principal (CDN de Sanity o /public) y `source` el respaldo si falla. */
export type CmsImage = { local: string; source: string; alt?: string };

/** Archivo descargable o video propio (CDN de Sanity o ruta en /public). */
export type CmsFile = { local: string; source: string };

export type CmsLink = { label: string; href: string };

export type Seo = { title?: string; description?: string; ogImage?: CmsImage };

export type SocialPlatform = "facebook" | "instagram" | "youtube" | "tiktok" | "linkedin";

export type NavGroup = { label: string; href: string; items?: CmsLink[] };

export type SiteSettings = {
  siteName: string;
  logos: { light: CmsImage; dark: CmsImage; color: CmsImage };
  contact: {
    email: string;
    whatsappNumber: string;
    phoneDisplay: string;
    whatsappMessage: string;
    officeName: string;
    addressShort: string;
    addressLines: string[];
    mapsUrl: string;
  };
  social: { platform: SocialPlatform; url: string }[];
  navigation: NavGroup[];
  headerCta: CmsLink;
  whatsappButtonLabel: string;
  footer: {
    tagline: string;
    columns: { title: string; links: CmsLink[] }[];
    contactTitle: string;
    whatsappLabel: string;
    copyright: string;
    showConstructionNotice: boolean;
    constructionNotice: string;
    credit: CmsLink;
    privacy: CmsLink;
  };
  underConstruction: {
    badge: string;
    title: string;
    text: string;
    domain: string;
    buttonLabel: string;
  };
  seo: { title: string; description: string; keywords: string[] };
};

export type SectionHead = { eyebrow: string; title: string; text?: string };

export type PageHero = { eyebrow: string; title: string; highlight: string; lead: string };

export type HomePageContent = {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    lead: string;
    primaryCta: CmsLink;
    secondaryCta: CmsLink;
    scrollLabel: string;
    image: CmsImage;
  };
  stats: SectionHead & { items: { value: string; label: string; text: string }[] };
  ally: SectionHead & { link: CmsLink; image: CmsImage; tags: string[] };
  benefits: SectionHead & { items: { title: string; text: string }[] };
  technology: SectionHead & { link: CmsLink; image: CmsImage; hotspots: { title: string; text: string }[] };
  cinematic: SectionHead & { highlight: string; image: CmsImage };
  history: SectionHead & { milestones: { year: string; name: string; note: string; image: CmsImage }[] };
  featured: SectionHead & {
    link: CmsLink;
    buttonLabel: string;
    items: { name: string; label: string; href: string; image: CmsImage }[];
  };
  service: SectionHead & { items: { title: string; text: string }[] };
  global: SectionHead & { link: CmsLink };
  contact: SectionHead & {
    whatsappTitle: string;
    emailTitle: string;
    mapLabel: string;
    form: {
      title: string;
      text: string;
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      productLabel: string;
      productOptions: { value: string; label: string }[];
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
    };
  };
  finalCta: SectionHead & { whatsappLabel: string; whatsappMessage: string; specialistLabel: string };
  specialistModal: {
    eyebrow: string;
    title: string;
    subtitle: string;
    whatsappTitle: string;
    whatsappText: string;
    whatsappAction: string;
    whatsappMessage: string;
    emailTitle: string;
    emailText: string;
    emailAction: string;
    emailSubject: string;
    emailBody: string;
    copyLabel: string;
    copiedLabel: string;
  };
};

export type AboutPageContent = {
  seo: Seo;
  hero: PageHero;
  intro: SectionHead & { paragraphs: string[] };
  support: SectionHead & { stats: { value: string; label: string }[] };
  reasons: SectionHead & { image: CmsImage; items: string[] };
};

export type PhilosophyPageContent = {
  seo: Seo;
  hero: PageHero & { symbol: string; symbolCaption: string };
  corporate: SectionHead & {
    mission: { tag: string; title: string; quote: string; text: string };
    vision: { tag: string; title: string; quote: string; text: string };
    quality: { tag: string; title: string; text: string; checklist: string[] };
    values: { tag: string; title: string; items: { title: string; text: string }[] };
  };
  intro: SectionHead;
  stages: { title: string; quote: string; text: string; image: CmsImage }[];
  stageLabel: string;
  epilogue: SectionHead;
};

export type Office = {
  country: string;
  name: string;
  address: string;
  contact: string;
  mapUrl?: string;
  image: CmsImage;
};

export type WorldNetworkPageContent = {
  seo: Seo;
  hero: PageHero & { badge: string };
  intro: SectionHead;
  offices: Office[];
  quote: string;
};

export type DistributorsPageContent = {
  seo: Seo;
  hero: PageHero & { badge: string };
  directory: SectionHead & {
    coverageLabel: string;
    regions: { place: string; distributors: { name: string; status?: string }[] }[];
  };
  join: SectionHead & {
    benefits: { title: string; text: string }[];
    whatsappLabel: string;
    whatsappMessage: string;
    emailLabel: string;
    emailSubject: string;
  };
  form: {
    badge: string;
    title: string;
    text: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      city: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    whatsappButton: string;
    emailButton: string;
    submittingLabel: string;
    requiredError: string;
    disclaimer: string;
    whatsappIntro: string;
    successTitle: string;
    successText: string;
    successWhatsapp: string;
    successEmail: string;
    resetLabel: string;
  };
  cta: SectionHead & { buttonLabel: string; whatsappMessage: string };
};

export type ComparisonRow = {
  name: string;
  badge?: string;
  fov: string;
  voxel: string;
  exposure: string[];
  recommendedUse: string;
  href: string;
  isComingSoon?: boolean;
  showTeaser?: boolean;
};

export type ProductsPageContent = {
  seo: Seo;
  hero: PageHero & { image: CmsImage; anchors: CmsLink[]; labels: string[] };
  catalog: SectionHead & {
    tabs: { threeD: string; twoD: string; intraoral: string };
    exploreLabel: string;
    comingSoonLabel: string;
    teaserLabel: string;
  };
  comparison: SectionHead & {
    scrollHint: string;
    columns: { model: string; fov: string; voxel: string; exposure: string; use: string; action: string };
    actionLabel: string;
    teaserLabel: string;
    rows: ComparisonRow[];
    whatsappMessage: string;
    whatsappComingSoonMessage: string;
  };
  teaser: SectionHead & {
    badge: string;
    image: CmsImage;
    video: CmsFile;
    footerText: string;
    buttonLabel: string;
    productName: string;
    modalTitle: string;
  };
  software: SectionHead & { moreLabel: string; previewLabel: string; comingSoonLabel: string };
  finalCta: { eyebrow: string; title: string; buttonLabel: string };
  detailLabels: ProductPageLabels;
};

export type ProductAsset = CmsImage;

export type ProductFeature = { title: string; text: string[]; images: ProductAsset[] };

export type ProductGalleryGroup = { title: string; text: string[]; images: ProductAsset[] };

export type SpecItem = { label?: string; values: string[] };
export type SpecGroup = { key: string; items: SpecItem[] };

export type CatalogGroup = "3d" | "2d" | "intraoral" | "software" | "none";

export type ProductDetail = {
  slug: string;
  name: string;
  category: string;
  catalogGroup: CatalogGroup;
  order: number;
  eyebrow: string;
  tagline: string;
  summary: string;
  intro: string[];
  heroImage: ProductAsset;
  heroVideo: CmsFile | null;
  highlights: string[];
  features: ProductFeature[];
  specs: SpecGroup[];
  dimensionImages: ProductAsset[];
  gallery: ProductGalleryGroup[];
  catalogPdf: CmsFile | null;
  trainingVideos: Array<CmsFile | string>;
  cardImage: ProductAsset;
  card: { title: string; description: string; image: ProductAsset };
  isComingSoon?: boolean;
  seo?: Seo;
};

export type ProductPageLabels = {
  comingSoonShort: string;
  comingSoonPill: string;
  teaserButton: string;
  notifyButton: string;
  preorderShort: string;
  comingSoonBadge: string;
  comingSoonFallback: string;
  preorderText: string;
  preorderButton: string;
  preorderMessage: string;
  introTitle: string;
  specsLabel: string;
  specsTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  videoLabel: string;
  videoTitleSingle: string;
  videoTitleMultiple: string;
  catalogLabel: string;
  catalogTitle: string;
  catalogButton: string;
  contactEyebrow: string;
  contactTitle: string;
  contactButton: string;
  relatedLabel: string;
  relatedTitle: string;
  primaryButton: string;
  secondaryButton: string;
};

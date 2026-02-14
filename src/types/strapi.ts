// Strapi 5 response types

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  keywords?: string | null;
  canonicalUrl?: string | null;
  metaRobots?: string | null;
  structuredData?: unknown;
  metaImage?: StrapiImage | null;
  metaSocial?: MetaSocial[] | null;
}

export interface MetaSocial {
  socialNetwork: "Facebook" | "Twitter";
  title: string;
  description: string;
  image?: StrapiImage | null;
}

export interface StrapiLocalization {
  Slug: string;
  locale: string;
}

export interface Activity {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Description: string;
  Intensity_Level?: number | null;
  Image?: StrapiImage | null;
  services: Service[];
  seo?: Seo | null;
  localizations?: StrapiLocalization[];
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Service {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Description: string;
  Service_Type: "Private" | "Group" | "Online" | "Event" | "Corporate";
  Base_Price: number;
  Duration_Minutes?: number | null;
  Location?: string | null;
  Image?: StrapiImage | null;
  activities: Activity[];
  bundles: Bundle[];
  seo?: Seo | null;
  localizations?: StrapiLocalization[];
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Bundle {
  id: number;
  documentId: string;
  Title: string;
  Description?: string | null;
  Price: number;
  Quantity: number;
  service: Service | null;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SocialLink {
  id: number;
  documentId: string;
  Title: string;
  URL: string;
  Icon: StrapiImage | null;
  Order: number;
  IsActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Homepage {
  Hero_Title: string;
  Hero_Subtitle: string;
  Hero_CTA_Text: string;
  Hero_CTA_Link: string;
  Hero_CTA_Secondary_Text?: string | null;
  Hero_CTA_Secondary_Link?: string | null;
  Hero_Image?: StrapiImage | null;
  About_Title: string;
  About_Description: string;
  About_CTA_Text?: string | null;
  About_CTA_Link?: string | null;
  About_Image?: StrapiImage | null;
  Featured_Activities_Title?: string | null;
  Featured_Activities_Subtitle?: string | null;
  Featured_Services_Title?: string | null;
  Featured_Services_Subtitle?: string | null;
  featured_activities: Activity[];
  featured_services: Service[];
  seo?: Seo | null;
  locale: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type Locale = "en" | "fr";

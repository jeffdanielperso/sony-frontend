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
  activities: Activity[];
  bundles: Bundle[];
  seo?: Seo | null;
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

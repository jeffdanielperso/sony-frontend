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

export interface Offer {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Description: string;
  Price: number | null;
  Type: "Vinyasa" | "Hatha" | "Pre-natal" | null;
  Image: StrapiImage;
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

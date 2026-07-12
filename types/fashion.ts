export interface ColorVariant {
  id: string;
  name: string;
  hexCode: string;
  imagePrimary: string;
  imageSecondary: string;
}

export interface Size {
  name: string;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: ProductCategory;
  sizesAvailable: Size[];
  colorVariants: ColorVariant[];
  stockQuantity: number;
  imagePrimary: string;
  imageSecondary: string;
  labels: ProductLabel[];
  isNew: boolean;
  isBestseller: boolean;
  material: string;
  careInstructions: string[];
}

export type ProductCategory = 
  | "outerwear"
  | "essentials"
  | "tailoring"
  | "footwear"
  | "accessories";

export type ProductLabel = 
  | "New Drop"
  | "Limited Edition"
  | "Bestseller"
  | "Low Stock"
  | "Sold Out"
  | "Exclusive";

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
  order: number;
}

export interface DropTimerConfig {
  enabled: boolean;
  targetDate: string;
  bannerText: string;
  alertText: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface ShippingTier {
  name: string;
  price: number;
  estimatedDays: string;
  countries: string[];
}

export interface BrandMetadata {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  socialLinks: SocialLink[];
  dropStatus: "active" | "upcoming" | "sold-out";
}

export interface ContactInfo {
  customerCareEmail: string;
  returnsHubAddress: string;
  supportPhone?: string;
}

export interface LookbookHotspot {
  id: string;
  productId: string;
  x: number;
  y: number;
  label: string;
}

export interface Lookbook {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspots: LookbookHotspot[];
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "shipping" | "returns" | "sizing" | "drop-day" | "general";
}

export interface SustainabilityMetric {
  label: string;
  value: string;
  description: string;
}

export interface FashionConfig {
  brand: BrandMetadata;
  dropTimer: DropTimerConfig;
  products: Product[];
  collections: Collection[];
  lookbooks: Lookbook[];
  reviews: Review[];
  faqs: FAQ[];
  contact: ContactInfo;
  shipping: ShippingTier[];
  sustainability: SustainabilityMetric[];
}

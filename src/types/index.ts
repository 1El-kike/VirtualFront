export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  blogPosts?: BlogPost[];
}

export interface Property {
  id: number;
  title: string;
  description?: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  images: string[];
  virtualTourUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  propertyId?: number;
  createdAt: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  image?: string;
}

export interface HousePreferences {
  id: string;
  createdAt: Date;

  // Información básica del cliente
  name: string;
  email: string;
  phone?: string;

  // Preferencias básicas
  propertyType: "house" | "apartment" | "townhouse" | "condo" | "other";
  location: string;
  budgetMin: number;
  budgetMax: number;
  bedrooms: number;
  bathrooms: number;
  minSqm: number;
  maxSqm: number;

  // Preferencias intermedias
  architecturalStyle: string[];
  features: string[];
  orientation: "north" | "south" | "east" | "west" | "any";
  floor: number;

  // Preferencias avanzadas
  constructionMaterials: string[];
  technology: string[];
  sustainability: string[];
  customizations: string;
  timeline: "immediate" | "3months" | "6months" | "1year" | "flexible";
  financing: "cash" | "mortgage" | "other";
}

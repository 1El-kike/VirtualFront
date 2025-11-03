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
  type: string;
  status: string;
  transation: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user?: {
    nombre?: string;
    email: string;
  };
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

export interface Swap {
  id: number;
  description?: string;
  status: string;
  fechasSolicitud: Date;
  fechaFinalizacion?: Date;
  userId: number;
  propertyofrecidaId: number;
  propertyDeseadaId: number;
  user: {
    nombre?: string;
    email: string;
  };
  propertyOfrecida: {
    id: number;
    title: string;
    location: string;
    price: number;
    images: string[];
  };
  propertyDeseada: {
    id: number;
    title: string;
    location: string;
    price: number;
    images: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Rent {
  id: number;
  priceMensual: number;
  deposito: number;
  duracionContrato: number;
  FechaInit: Date;
  fechaEnd?: Date;
  mascota: boolean;
  amueblado: boolean;
  serviceInclude?: string;
  status: string;
  propertyId: number;
  userId: number;
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    images: string[];
  };
  user: {
    nombre?: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: number;
  fechaReservation: Date;
  fechaVisita: Date;
  status: string;
  notas?: string;
  propertyId: number;
  userId: number;
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    images: string[];
  };
  user: {
    nombre?: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Construction {
  id: number;
  nameProyect: string;
  description: string;
  direction: string;
  fechaInicial: Date;
  fechaEstimada: Date;
  presupuesto: number;
  etapa: string;
  status: string;
  propertyId: number;
  userId: number;
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    images: string[];
  };
  user: {
    nombre?: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Remodeling {
  id: number;
  description: string;
  presupuesto: number;
  fechaInit: Date;
  fechaEndEstimada: Date;
  services: string;
  status: string;
  propertyId: number;
  userId: number;
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    images: string[];
  };
  user: {
    nombre?: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
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

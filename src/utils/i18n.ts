import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Virtual Real Estate",
      properties: "Properties",
      contact: "Contact",
      blog: "Blog",
      heroTitle: "Find Your Dream Home",
      heroSubtitle:
        "Explore properties from anywhere with our immersive virtual tours and advanced search tools.",
      createCard: "Create Card",
      featuredProperties: "Featured Properties",
      services: "Our Services",
      advancedSearch: "Advanced Search",
      advancedSearchDesc:
        "Find properties that match your exact criteria with our powerful search filters.",
      virtualTours: "Virtual Tours",
      virtualToursDesc:
        "Experience properties remotely with 360° virtual tours and interactive walkthroughs.",
      leadManagement: "Lead Management",
      leadManagementDesc:
        "Efficiently manage and nurture potential buyers and sellers.",
      blogDesc:
        "Stay informed with the latest real estate news and market insights.",
      statistics: "Statistics",
      testimonials: "Testimonials",
      propertiesSold: "Properties Sold",
      happyClients: "Happy Clients",
      yearsExperience: "Years of Experience",
      awardsWon: "Awards Won",
      footerText: "© 2024 Virtual Real Estate. All rights reserved.",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a Inmobiliaria Virtual",
      properties: "Propiedades",
      contact: "Contacto",
      blog: "Blog",
      heroTitle: "Descubre tu Hogar Soñado",
      heroSubtitle:
        "Explora propiedades desde cualquier lugar con nuestros tours virtuales inmersivos y herramientas de búsqueda avanzadas.",
      createCard: "Crear Ficha",
      featuredProperties: "Propiedades Destacadas",
      services: "Nuestros Servicios",
      advancedSearch: "Búsqueda Avanzada",
      advancedSearchDesc:
        "Encuentra propiedades que coincidan con tus criterios exactos con nuestros potentes filtros de búsqueda.",
      virtualTours: "Tours Virtuales",
      virtualToursDesc:
        "Experimenta propiedades de forma remota con tours virtuales de 360° y recorridos interactivos.",
      leadManagement: "Gestión de Leads",
      leadManagementDesc:
        "Gestiona y nutre eficientemente a compradores y vendedores potenciales.",
      blogDesc:
        "Mantente informado con las últimas noticias inmobiliarias y perspectivas del mercado.",
      statistics: "Estadísticas",
      testimonials: "Testimonios",
      propertiesSold: "Propiedades Vendidas",
      happyClients: "Clientes Felices",
      yearsExperience: "Años de Experiencia",
      awardsWon: "Premios Ganados",
      footerText: "© 2024 Inmobiliaria Virtual. Todos los derechos reservados.",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: "web-app" | "mobile" | "api" | "other";
}

export const projects: Project[] = [
  // PROYECTO DESTACADO (Portfolio)
  {
    id: "portfolio",
    title: "",
    description: "",
    longDescription: "",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "i18next",
    ],
    githubUrl: "https://github.com/Adriasu09/adriana-portfolio",
    image: "/images/projects/adriana_portfolio.png",
    liveUrl: "https://adriana-portfolio-blue.vercel.app",
    featured: true,
    category: "web-app",
  },

  // Los Inmaduros Rollers Madrid (Proyecto Final Bootcamp)
  {
    id: "los-inmaduros-rollers",
    title: "",
    description: "",
    longDescription: "",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Firebase",
      "Clerk",
      "Google Maps API",
    ],
    githubUrl: "https://github.com/Adriasu/los-inmaduros-rollers-madrid",
    image: "/images/projects/los_inmaduros_roller_madrid.png",
    liveUrl: "https://los-inmaduros-rollers-madrid.vercel.app",
    featured: true,
    category: "web-app",
  },

  // Café de Altura (E-commerce)
  {
    id: "cafe-de-altura",
    title: "",
    description: "",
    longDescription: "",
    technologies: ["Next.js", "React", "MongoDB", "Tailwind CSS", "shadcn/ui"],
    githubUrl: "https://github.com/Adriasu/cafe-de-altura",
    image: "/images/projects/cafe_de_altura.png",
    liveUrl: "https://cafe-de-altura-lovat.vercel.app",
    featured: true,
    category: "web-app",
  },
];

export function getProjectsWithTranslations(
  t: (key: string) => string,
): Project[] {
  return projects.map((project) => ({
    ...project,
    title: t(`projects.${project.id}.title`),
    description: t(`projects.${project.id}.description`),
    longDescription: t(`projects.${project.id}.longDescription`),
  }));
}

export function getFeaturedProjects(t: (key: string) => string): Project[] {
  return getProjectsWithTranslations(t).filter((project) => project.featured);
}

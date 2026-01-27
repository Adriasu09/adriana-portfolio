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
    liveUrl: "https://adriana-portfolio-blue.vercel.app/",
    featured: true,
    category: "web-app",
  },
  {
    id: "proyecto-1",
    title: "",
    description: "",
    longDescription: "",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    image: "/images/projects/proyecto-1.jpg",
    githubUrl: "https://github.com/Adriasu09/proyecto-1",
    liveUrl: "https://proyecto-1.vercel.app",
    featured: true,
    category: "web-app",
  },
  {
    id: "proyecto-2",
    title: "",
    description: "",
    technologies: ["React", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/Adriasu09/proyecto-2",
    featured: false,
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

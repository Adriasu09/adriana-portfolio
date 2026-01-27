export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "huargo-capital",
    company: "Huargo Capital",
    position: "",
    period: "",
    location: "",
    description: "",
    achievements: [],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "TanStack Router/Query",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "shadcn/ui",
    ],
  },
  {
    id: "fusuma",
    company: "Fusuma",
    position: "",
    period: "",
    location: "",
    description: "",
    achievements: [],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Git",
      "Responsive Design",
      "Supabase",
    ],
  },
  {
    id: "gamma-tech-school",
    company: "Gamma Tech School",
    position: "",
    period: "",
    location: "",
    description: "",
    achievements: [],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Git",
      "Responsive Design",
      "firebase",
    ],
  },
];

export function getExperiencesWithTranslations(
  t: (key: string) => string,
): Experience[] {
  return experiences.map((exp) => ({
    ...exp,
    position: t(`experience.${exp.id}.position`),
    period: t(`experience.${exp.id}.period`),
    location: t(`experience.${exp.id}.location`),
    description: t(`experience.${exp.id}.description`),
    achievements: [
      t(`experience.${exp.id}.achievements.0`),
      t(`experience.${exp.id}.achievements.1`),
      t(`experience.${exp.id}.achievements.2`),
      t(`experience.${exp.id}.achievements.3`),
      t(`experience.${exp.id}.achievements.4`),
      t(`experience.${exp.id}.achievements.5`),
    ].filter(Boolean),
  }));
}

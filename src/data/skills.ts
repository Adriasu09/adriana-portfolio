export interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "tools";
}

export const skills: Skill[] = [
  // Frontend
  {
    name: "React / Next.js",
    level: 85,
    category: "frontend",
  },
  {
    name: "TypeScript",
    level: 80,
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    category: "frontend",
  },
  {
    name: "TanStack Query/Router",
    level: 75,
    category: "frontend",
  },
  {
    name: "Framer Motion",
    level: 70,
    category: "frontend",
  },

  // Backend
  {
    name: "Node.js / NestJS",
    level: 75,
    category: "backend",
  },
  {
    name: "PostgreSQL / Prisma",
    level: 70,
    category: "backend",
  },
  {
    name: "PHP / MySQL",
    level: 60,
    category: "backend",
  },
  {
    name: "RESTful APIs",
    level: 80,
    category: "backend",
  },

  // Tools
  {
    name: "Git / GitHub",
    level: 85,
    category: "tools",
  },
  {
    name: "Vercel / Deployment",
    level: 80,
    category: "tools",
  },
  {
    name: "shadcn/ui",
    level: 75,
    category: "tools",
  },
  {
    name: "Responsive Design",
    level: 85,
    category: "tools",
  },
];

export function getCategoryName(
  category: string,
  t: (key: string) => string,
): string {
  return t(`skills.categories.${category}`);
}

export function getSkillsByCategory() {
  return {
    frontend: skills.filter((skill) => skill.category === "frontend"),
    backend: skills.filter((skill) => skill.category === "backend"),
    tools: skills.filter((skill) => skill.category === "tools"),
  };
}

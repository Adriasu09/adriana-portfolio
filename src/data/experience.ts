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
    position: "Frontend/Fullstack Developer",
    period: "Jul 2025 - Jan 2026",
    location: "Remote",
    description:
      "Developed and maintained fintech platforms including Riitmo (cryptocurrency trading) and Pórtiqo (investment platform).",
    achievements: [
      "Built comprehensive dashboard systems with real-time user statistics and KYC alerts",
      "Implemented advanced filtering capabilities and user management features",
      "Developed investment product administration with legal document editors (WYSIWYG)",
      "Integrated KYC verification system with Sumsub API",
      "Created media management systems for platform content",
      "Worked with microservices architecture (NestJS backend + React frontend)",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "TanStack Router/Query",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "shadcn/ui",
    ],
  },
  {
    id: "fusuma",
    company: "Fusuma",
    position: "Fullstack Developer (Internship)",
    period: "Oct 2024 - Jan 2025",
    location: "Barcelona, Spain",
    description:
      "Completed a 3-month internship developing full-stack applications with focus on frontend development using modern frameworks and best practices.",
    achievements: [
      "Developed features for ECUS platform using Next.js and TypeScript",
      "Contributed to Rapid project with responsive UI components",
      "Implemented user interfaces following design specifications",
      "Collaborated with senior developers using Git workflow",
      "Participated in code reviews and daily stand-ups",
      "Applied best practices in component architecture and state management",
    ],
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
    position: "Frontend Development Bootcamp",
    period: "2024",
    location: "Barcelona, Spain",
    description:
      "Completed intensive 500-hour frontend development bootcamp focusing on modern web technologies and best practices.",
    achievements: [
      "Built multiple full-stack projects from scratch",
      "Learned React, TypeScript, and modern frontend tooling",
      "Collaborated on team projects using Git workflow",
      "Developed responsive and accessible user interfaces",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Git",
      "Responsive Design",
    ],
  },
];

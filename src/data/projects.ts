export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: 'web-app' | 'mobile' | 'api' | 'other'
}

export const projects: Project[] = [
  {
    id: 'proyecto-1',
    title: 'Nombre Proyecto 1',
    description: 'Descripción corta del proyecto (1-2 líneas)',
    longDescription: 'Descripción más detallada de qué hace el proyecto, qué problemas resuelve, y características principales.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    image: '/images/projects/proyecto-1.jpg', // Opcional
    githubUrl: 'https://github.com/tuusuario/proyecto-1',
    liveUrl: 'https://proyecto-1.vercel.app',
    featured: true,
    category: 'web-app',
  },
  {
    id: 'proyecto-2',
    title: 'Nombre Proyecto 2',
    description: 'Descripción corta del proyecto (1-2 líneas)',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/tuusuario/proyecto-2',
    featured: true,
    category: 'web-app',
  },
  // Este portfolio también es un proyecto
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description: 'Interactive terminal-themed portfolio built with Next.js 16, featuring modern animations and dark mode support.',
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
    githubUrl: 'https://github.com/Adriasu09/adriana-portfolio',
    liveUrl: 'https://adriana-portfolio.vercel.app',
    featured: true,
    category: 'web-app',
  },
]
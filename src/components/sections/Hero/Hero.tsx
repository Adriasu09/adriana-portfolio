import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white">
          Building Digital <span className="text-primary">Experiences</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Frontend & Fullstack Developer specialized in creating modern,
          scalable, and performant web applications
        </p>
      </div>

      <Terminal />

      <div className="mt-12 flex gap-4">
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform">
          View Projects
        </button>
        <button className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white">
          Download CV
        </button>
      </div>
    </section>
  );
}

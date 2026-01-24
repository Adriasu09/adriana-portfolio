export default function Home() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
        <h1 className="text-5xl font-bold text-primary">
          Adriana Portfolio
        </h1>
        <p className="text-2xl text-accent">
          Gradient Blues Theme Active! 🎨
        </p>
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-primary rounded-lg"></div>
          <div className="w-20 h-20 bg-accent rounded-lg"></div>
          <div className="w-20 h-20 bg-primary-dark rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
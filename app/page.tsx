
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-4">
    <div className="max-w-2xl text-center space-y-8">
      {/* Animated Icon/Graphic */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-500 text-xl">
            JS
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Project is <span className="text-blue-500 text-glow">Under Development</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
          Ami ekhon amar portfolio ebong projects gulo update korchi. Khub shighroi kichu awesome jinish niye ashchi!
        </p>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium">
          Next.js 15
        </span>
        <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium">
          TypeScript
        </span>
        <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium">
          Tailwind CSS
        </span>
      </div>

      {/* Footer/Contact Hint */}
      <div className="pt-8 text-zinc-500 text-sm uppercase tracking-widest">
        Coming Soon • 2026
      </div>
    </div>
  </main>
  );
}

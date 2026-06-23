export default function MovieWatchLoading() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-6 text-white sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-20 animate-pulse rounded-xl bg-white/5" />
        <div className="mt-6 aspect-video animate-pulse rounded-xl bg-white/7" />
        <div className="mt-6 h-48 animate-pulse rounded-xl bg-white/5" />
      </div>
    </main>
  );
}

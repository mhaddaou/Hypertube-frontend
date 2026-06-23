export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-12">
        <p className="font-serif text-3xl font-bold italic text-white/80">{message}</p>
      </div>
    </main>
  );
}

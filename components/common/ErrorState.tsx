import Link from "next/link";

export function ErrorState({
  action,
  message,
  title = "Something went quiet",
}: {
  action?: () => void;
  message: string;
  title?: string;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050505] px-4 text-white">
      <section className="max-w-md rounded-xl border border-white/10 bg-white/[0.035] p-6 text-center shadow-2xl shadow-black/50">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff9f00]">
          H-Tube
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold italic">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {action ? (
            <button
              type="button"
              onClick={action}
              className="rounded-md bg-[#ff9f00] px-4 py-2.5 text-sm font-black text-black transition hover:bg-[#ffb12a]"
            >
              Try again
            </button>
          ) : null}
          <Link
            href="/"
            className="rounded-md border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition hover:border-[#ff9f00] hover:text-[#ff9f00]"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";

import { fallbackComments } from "@/data/fallbackComments";
import { SectionTitle } from "./SectionTitle";

function Avatar() {
  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-800">
      <Image src="/globe.svg" alt="" fill sizes="48px" className="object-cover invert" />
    </div>
  );
}

export function Discussion() {
  return (
    <section className="bg-[#09090b] py-11 sm:py-[3.25rem]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionTitle title="discussion" />

        <div className="mt-9 max-w-3xl rounded-lg border border-white/55 bg-black/10 p-5 shadow-xl shadow-black/35 sm:p-6">
          <div className="flex items-start gap-4">
            <Avatar />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">Johannes Hudson</p>
              <textarea
                className="mt-5 min-h-24 w-full resize-none border-b border-white/65 bg-transparent text-xs leading-6 text-white/75 outline-none placeholder:text-white/45 sm:text-sm"
                placeholder="Share your opinion about this movie..."
              />
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-[#ff9f00] px-8 py-2.5 text-sm font-bold text-black transition hover:bg-[#ffb12a]"
                >
                  comment
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-4xl space-y-8">
          {fallbackComments.map((comment) => (
            <article key={comment.user} className="flex gap-4">
              <Avatar />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{comment.user}</p>
                <p className="mt-3 max-w-3xl text-xs leading-6 text-white/70 sm:text-sm">
                  {comment.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex max-w-4xl justify-center">
          <button
            type="button"
            className="rounded-md border border-white/70 px-8 py-2 text-sm font-semibold text-white transition hover:border-[#ff9f00] hover:text-[#ff9f00]"
          >
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}

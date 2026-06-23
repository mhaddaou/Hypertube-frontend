"use client";

import { ErrorState } from "@/components/common/ErrorState";

export default function MovieWatchError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      action={reset}
      title="Something went quiet"
      message="The watch page could not load this movie right now. You can retry or head back to the movie details page."
    />
  );
}

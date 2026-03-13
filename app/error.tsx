"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="text-xl font-bold">Что-то пошло не так</h1>
      <p className="mt-2 text-center text-muted-foreground">
        {error.message}
      </p>
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}

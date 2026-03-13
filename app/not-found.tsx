import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="font-accent text-4xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">Страница не найдена</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        На главную
      </Link>
    </div>
  );
}

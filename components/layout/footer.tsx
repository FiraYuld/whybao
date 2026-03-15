import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground">
        <p className="font-accent font-semibold text-foreground">WhyBao</p>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <Link href="/privacy" className="hover:text-foreground">
            Политика конфиденциальности
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Пользовательское соглашение
          </Link>
        </nav>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";
const EVENT_NAME = "cookie-consent-accepted";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== "accepted") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
    window.dispatchEvent(new Event(EVENT_NAME));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookie"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t bg-card p-4 shadow-lg md:left-4 md:right-4 md:bottom-4 md:max-w-md md:rounded-lg"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="container mx-auto flex flex-col gap-4 md:container-none">
        <p className="font-accent text-sm font-semibold text-foreground">
          Мы используем cookie и аналитику
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Чтобы улучшать сайт и понимать, как им пользуются, мы используем Яндекс.Метрику.
          Подробнее — в{" "}
          <Link href="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">
            Политике конфиденциальности
          </Link>.
        </p>
        <button
          type="button"
          onClick={accept}
          className="inline-flex h-9 w-full items-center justify-center rounded-none border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:w-auto md:self-start"
        >
          Принять
        </button>
      </div>
    </div>
  );
}

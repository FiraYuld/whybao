"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ym?: (id: number, action: string, params: Record<string, unknown>) => void;
  }
}

const YANDEX_METRIKA_ID = 107709081;
const CONSENT_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent-accepted";

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function initMetrika() {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(YANDEX_METRIKA_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: "dataLayer",
    });
  }
}

export function YandexMetrika() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (hasConsent()) setConsented(true);
    const handler = () => setConsented(true);
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onLoad={initMetrika}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: -9999 }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

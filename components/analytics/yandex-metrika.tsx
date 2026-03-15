"use client";

import Script from "next/script";

declare global {
  interface Window {
    ym?: (id: number, action: string, params: Record<string, unknown>) => void;
  }
}

const YANDEX_METRIKA_ID = 107709081;

export function YandexMetrika() {
  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onLoad={() => {
          if (typeof window !== "undefined" && window.ym) {
            window.ym(YANDEX_METRIKA_ID, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              ecommerce: "dataLayer",
            });
          }
        }}
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

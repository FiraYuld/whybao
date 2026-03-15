"use client";

import Script from "next/script";

const YANDEX_METRIKA_ID = 107709081;

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

/** Метрика загружается для всех визитов, чтобы счётчик и отчёты работали. Баннер cookie — информационный. */
export function YandexMetrika() {
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

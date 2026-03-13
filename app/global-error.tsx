"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body>
        <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui" }}>
          <h1>Что-то пошло не так</h1>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Попробовать снова
          </button>
        </div>
      </body>
    </html>
  );
}

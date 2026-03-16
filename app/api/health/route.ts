import { NextResponse } from "next/server";

/**
 * Проверка работы сервера и какой регион отдаёт ответ (для гео-маршрутизации).
 * На сервере в РФ задайте DEPLOY_REGION=ru, в EU — DEPLOY_REGION=eu.
 */
export async function GET() {
  const region = process.env.DEPLOY_REGION ?? "unknown";
  return NextResponse.json(
    {
      ok: true,
      region,
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobAuth } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const pathname = new URL(req.url).searchParams.get("path");
  if (!pathname?.startsWith("vortex/uploads/"))
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  const auth = await getBlobAuth();
  if (!auth)
    return NextResponse.json({ error: "Blob indisponível" }, { status: 503 });
  const result = await get(pathname, { access: "private", ...auth });
  if (!result || result.statusCode !== 200)
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      ETag: result.blob.etag,
    },
  });
}

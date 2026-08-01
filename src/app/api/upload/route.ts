import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getBlobAuth } from "@/lib/content";

export async function POST(req: Request) {
  if (!(await isAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const auth = await getBlobAuth();
  if (!auth)
    return NextResponse.json(
      { error: "Vercel Blob não configurado" },
      { status: 503 },
    );
  const data = await req.formData();
  const file = data.get("file");
  if (!(file instanceof File))
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  if (!file.type.startsWith("image/"))
    return NextResponse.json({ error: "Envie uma imagem" }, { status: 400 });
  const blob = await put(`vortex/uploads/${Date.now()}-${file.name}`, file, {
    access: "private",
    addRandomSuffix: true,
    ...auth,
  });
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  return NextResponse.json({
    url: `${origin}/api/media?path=${encodeURIComponent(blob.pathname)}`,
    pathname: blob.pathname,
  });
}

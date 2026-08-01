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
    access: "public",
    addRandomSuffix: true,
    ...auth,
  });
  return NextResponse.json({ url: blob.url });
}

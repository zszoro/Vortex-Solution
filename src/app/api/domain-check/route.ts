import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const suffixes = ["vercel.app", "com", "com.br", "net", "app", "io"] as const;

async function checkDomain(domain: string, suffix: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const registryUrls: Record<string, string> = {
      com: `https://rdap.verisign.com/com/v1/domain/${domain}`,
      net: `https://rdap.verisign.com/net/v1/domain/${domain}`,
      app: `https://pubapi.registry.google/rdap/domain/${domain}`,
      "com.br": `https://rdap.registro.br/domain/${domain}`,
    };
    const url = suffix === "vercel.app"
      ? `https://${domain}`
      : suffix === "io"
        ? `https://dns.google/resolve?name=${domain}&type=NS`
        : registryUrls[suffix];
    const response = await fetch(url, {
      method: suffix === "vercel.app" ? "HEAD" : "GET",
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
      headers: { "User-Agent": "Vortex-Studio-Domain-Check/1.0" },
    });
    if (suffix === "io" && response.ok) {
      const dns = await response.json() as { Status?: number; Answer?: unknown[] };
      return dns.Status === 3 || !dns.Answer?.length ? "available" as const : "taken" as const;
    }
    if (response.status === 404) return "available" as const;
    if (response.ok || response.status === 403) return "taken" as const;
    return "unknown" as const;
  } catch {
    return "unknown" as const;
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("name")?.toLowerCase() || "";
  const name = raw.replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "").slice(0, 50);
  if (name.length < 2 || name.includes("--")) {
    return NextResponse.json({ error: "Nome de domínio inválido" }, { status: 400 });
  }
  const entries = await Promise.all(suffixes.map(async (suffix) => {
    const domain = `${name}.${suffix}`;
    return [suffix, { domain, status: await checkDomain(domain, suffix) }] as const;
  }));
  return NextResponse.json({ name, results: Object.fromEntries(entries) }, {
    headers: { "Cache-Control": "no-store" },
  });
}

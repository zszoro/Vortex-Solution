import { head, put } from "@vercel/blob";
import { demos as seedDemos, projects as seedProjects } from "@/data/site";

export type ManagedProject = {
  slug: string;
  name: string;
  category: string;
  year: string;
  tech: string[];
  description: string;
  longDescription?: string;
  tone: string;
  image?: string;
  url: string;
  status?: string;
  featured?: boolean;
};
export type ManagedDemo = {
  slug: string;
  name: string;
  type: string;
  accent: string;
  tagline: string;
  description?: string;
  image?: string;
  url?: string;
  tech: string[];
};
export type SiteContent = {
  projects: ManagedProject[];
  demos: ManagedDemo[];
  updatedAt: string;
};

const extraDemos: ManagedDemo[] = [
  {
    slug: "beleza",
    name: "Lumière",
    type: "Beleza & Skincare",
    accent: "#ec4899",
    tagline: "Cuidado que começa em você.",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
    url: "/demonstracoes/beleza",
    tech: ["Next.js", "TypeScript", "Checkout"],
  },
  {
    slug: "casa-design",
    name: "Forma",
    type: "Casa & Design",
    accent: "#d97706",
    tagline: "Design para viver melhor.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
    url: "/demonstracoes/casa-design",
    tech: ["React", "Catálogo", "PIX"],
  },
];

const demoImages: Record<string, string> = {
  "loja-gamer":
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
  moda: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85",
  eletronicos:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=85",
  restaurante:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  marketplace:
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=85",
};

export const defaultContent: SiteContent = {
  projects: seedProjects.map((p) => ({
    ...p,
    url: `/projetos/${p.slug}`,
    status: "Disponível",
    featured: false,
  })),
  demos: [
    ...seedDemos.map((d) => ({
      ...d,
      image: demoImages[d.slug],
      url: `/demonstracoes/${d.slug}`,
      tech: ["Next.js", "TypeScript", "Carrinho"],
    })),
    ...extraDemos,
  ],
  updatedAt: new Date(0).toISOString(),
};

const blobName = "vortex/content.json";
export async function getContent(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return defaultContent;
  try {
    const meta = await head(blobName);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch {}
  return defaultContent;
}
export async function saveContent(content: SiteContent) {
  if (!process.env.BLOB_READ_WRITE_TOKEN)
    throw new Error("BLOB_NOT_CONFIGURED");
  const next = { ...content, updatedAt: new Date().toISOString() };
  await put(blobName, JSON.stringify(next), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  return next;
}

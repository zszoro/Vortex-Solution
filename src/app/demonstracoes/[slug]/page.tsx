import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoStore } from "@/components/DemoStore";
import { getContent } from "@/lib/content";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = (await getContent()).demos.find((x) => x.slug === slug);
  return d
    ? {
        title: `Demonstração ${d.type}`,
        description: `Explore a demonstração navegável ${d.name}, criada pela Vortex Studio.`,
        robots: { index: false, follow: true },
      }
    : {};
}
export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = (await getContent()).demos.find((d) => d.slug === slug);
  if (!demo) notFound();
  return <DemoStore demo={demo} />;
}

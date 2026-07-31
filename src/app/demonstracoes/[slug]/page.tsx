import type {Metadata} from "next";import {notFound} from "next/navigation";import {DemoStore} from "@/components/DemoStore";import {demos} from "@/data/site";
export function generateStaticParams(){return demos.map(d=>({slug:d.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const d=demos.find(x=>x.slug===slug);return d?{title:`Demonstração ${d.type}`,description:`Explore a demonstração navegável ${d.name}, criada pela Vortex Studio.`,robots:{index:false,follow:true}}:{}}
export default async function DemoPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const demo=demos.find(d=>d.slug===slug);if(!demo)notFound();return <DemoStore demo={demo}/>}

import {NextResponse} from "next/server";import {getContent,saveContent} from "@/lib/content";import {isAuthenticated} from "@/lib/auth";
export const dynamic="force-dynamic";
export async function GET(){return NextResponse.json(await getContent(),{headers:{"Cache-Control":"no-store"}})}
export async function PUT(req:Request){if(!await isAuthenticated())return NextResponse.json({error:"Não autorizado"},{status:401});try{return NextResponse.json(await saveContent(await req.json()))}catch(e){if(e instanceof Error&&e.message==="BLOB_NOT_CONFIGURED")return NextResponse.json({error:"O Vercel Blob ainda não está conectado ao projeto."},{status:503});throw e}}

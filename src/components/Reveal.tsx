"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
export function Reveal({children,className=""}:{children:ReactNode,className?:string}){const ref=useRef<HTMLDivElement>(null);const [seen,setSeen]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const ob=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setSeen(true);ob.disconnect()}},{threshold:.12});ob.observe(el);return()=>ob.disconnect()},[]);return <div ref={ref} className={`reveal ${seen?"seen":""} ${className}`}>{children}</div>}

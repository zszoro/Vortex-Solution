"use client";
import { useState } from "react";import { ChevronDown } from "lucide-react";import { faq } from "@/data/site";
export function Accordion(){const [open,setOpen]=useState(0);return <div className="accordion">{faq.map(([q,a],i)=><div className="faq-item" key={q}><h3><button aria-expanded={open===i} onClick={()=>setOpen(open===i?-1:i)}>{q}<ChevronDown/></button></h3><div className={open===i?"answer open":"answer"}><p>{a}</p></div></div>)}</div>}

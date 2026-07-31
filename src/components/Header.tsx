"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/data/site";
export function Header(){const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);useEffect(()=>{const fn=()=>setScrolled(scrollY>24);fn();addEventListener("scroll",fn,{passive:true});return()=>removeEventListener("scroll",fn)},[]);return <header className={scrolled?"header scrolled":"header"}><div className="nav-wrap"><Logo/><nav className={open?"nav open":"nav"} aria-label="Navegação principal">{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}<a className="btn nav-cta" href="#contato" onClick={()=>setOpen(false)}>Solicitar orçamento</a></nav><button className="menu-btn" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"Fechar menu":"Abrir menu"}>{open?<X/>:<Menu/>}</button></div></header>}

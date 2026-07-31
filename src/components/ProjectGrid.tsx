"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Eye } from "lucide-react";
import type { ManagedProject } from "@/lib/content";
export function ProjectGrid({ projects }: { projects: ManagedProject[] }) {
  const cats = ["Todos", ...new Set(projects.map((p) => p.category))];
  const [cat, setCat] = useState("Todos");
  const [expanded, setExpanded] = useState(false);
  const filtered =
    cat === "Todos" ? projects : projects.filter((p) => p.category === cat);
  const list = expanded ? filtered : filtered.slice(0, 4);
  return (
    <>
      <div className="filters" role="group" aria-label="Filtrar projetos">
        {cats.map((c) => (
          <button
            className={cat === c ? "active" : ""}
            onClick={() => {
              setCat(c);
              setExpanded(false);
            }}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {list.map((p) => (
          <article className="project-card" key={p.slug}>
            <div className={`project-art ${p.tone}`}>
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:760px) 100vw, 50vw"
                />
              )}
              <span>PROJETO CONCEITUAL</span>
              {!p.image && (
                <div className="mock-window">
                  <i />
                  <i />
                  <i />
                  <b>{p.name}</b>
                  <em>VORTEX / {p.year}</em>
                </div>
              )}
            </div>
            <div className="project-info">
              <span>
                {p.category} · {p.year}
              </span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.tech.map((t) => (
                  <i key={t}>{t}</i>
                ))}
              </div>
              <div className="card-actions">
                <Link href={`/projetos/${p.slug}`}>
                  Ver detalhes <Eye />
                </Link>
                <a
                  href={p.url || `/projetos/${p.slug}`}
                  target={p.url?.startsWith("http") ? "_blank" : undefined}
                >
                  Visualizar projeto <ArrowUpRight />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length > 4 && (
        <button className="read-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Mostrar menos" : "Ver todos os projetos"}
          <ChevronDown className={expanded ? "rotate" : ""} />
        </button>
      )}
    </>
  );
}

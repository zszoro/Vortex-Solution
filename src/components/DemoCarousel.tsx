"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ManagedDemo } from "@/lib/content";
export function DemoCarousel({ demos }: { demos: ManagedDemo[] }) {
  const [start, setStart] = useState(0);
  const visible =
    demos.length > 5
      ? Array.from({ length: 5 }, (_, i) => demos[(start + i) % demos.length])
      : demos;
  function move(dir: number) {
    setStart((x) => (x + dir + demos.length) % demos.length);
  }
  return (
    <div className="demo-carousel">
      {demos.length > 5 && (
        <button
          className="carousel-arrow left"
          onClick={() => move(-1)}
          aria-label="Demonstrações anteriores"
        >
          <ChevronLeft />
        </button>
      )}
      <div className="demo-grid">
        {visible.map((d, i) => (
          <Link
            href={d.url || `/demonstracoes/${d.slug}`}
            key={`${d.slug}-${start}`}
            style={{ "--accent": d.accent } as React.CSSProperties}
          >
            <span>
              {String(((start + i) % demos.length) + 1).padStart(2, "0")} / DEMO
            </span>
            <div className="demo-thumb">
              {d.image && (
                <Image src={d.image} alt={d.name} fill sizes="220px" />
              )}
              <b>{d.name}</b>
            </div>
            <h3>{d.type}</h3>
            <p>{d.tagline}</p>
            <em>
              Abrir demonstração <ArrowUpRight />
            </em>
          </Link>
        ))}
      </div>
      {demos.length > 5 && (
        <button
          className="carousel-arrow right"
          onClick={() => move(1)}
          aria-label="Próximas demonstrações"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}

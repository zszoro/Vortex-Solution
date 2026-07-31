"use client";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import * as I from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ManagedDemo, ManagedProject, SiteContent } from "@/lib/content";
import { Logo } from "./Logo";
const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Svelte",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "C++",
  "PHP",
  "Laravel",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "Tailwind CSS",
  "Firebase",
  "Supabase",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "REST API",
  "Docker",
  "AWS",
  "Vercel",
  "Stripe",
  "Mercado Pago",
  "PIX",
  "Analytics",
  "IA",
  "Automação",
];
type Item =
  | (ManagedProject & { kind: "project" })
  | (ManagedDemo & { kind: "demo" });
const sections: ReadonlyArray<readonly [string, LucideIcon]> = [
  ["Visão geral", I.LayoutDashboard],
  ["Projetos", I.BriefcaseBusiness],
  ["Demonstrações", I.MonitorPlay],
  ["Planos", I.BadgeDollarSign],
  ["Serviços", I.Boxes],
  ["Clientes & CRM", I.Users],
  ["Solicitações", I.MessageSquareText],
  ["Biblioteca", I.Images],
  ["Configurações", I.Settings],
];
export function AdminApp({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState(initial);
  const [active, setActive] = useState("Visão geral");
  const [editing, setEditing] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const ch = new BroadcastChannel("vortex-content");
    return () => ch.close();
  }, []);
  const items = useMemo(
    () => (active === "Projetos" ? content.projects : content.demos),
    [active, content],
  );
  async function persist(next: SiteContent) {
    setSaving(true);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    if (!res.ok) {
      setNotice((await res.json()).error || "Não foi possível salvar.");
      return false;
    }
    const saved = await res.json();
    setContent(saved);
    new BroadcastChannel("vortex-content").postMessage("refresh");
    setNotice("Publicado. O site principal foi atualizado automaticamente.");
    router.refresh();
    return true;
  }
  function blank(kind: "project" | "demo"): Item {
    return kind === "project"
      ? {
          kind,
          slug: "",
          name: "",
          category: "Site",
          year: String(new Date().getFullYear()),
          tech: [],
          description: "",
          longDescription: "",
          tone: "purple",
          image: "",
          url: "",
          status: "Disponível",
        }
      : {
          kind,
          slug: "",
          name: "",
          type: "Nova demonstração",
          accent: "#8b5cf6",
          tagline: "",
          description: "",
          image: "",
          url: "",
          tech: [],
        };
  }
  async function remove(item: Item) {
    if (!confirm(`Excluir ${item.name}?`)) return;
    const next = {
      ...content,
      projects:
        item.kind === "project"
          ? content.projects.filter((x) => x.slug !== item.slug)
          : content.projects,
      demos:
        item.kind === "demo"
          ? content.demos.filter((x) => x.slug !== item.slug)
          : content.demos,
    };
    await persist(next);
  }
  async function saveItem(item: Item) {
    const clean = {
      ...item,
      slug:
        item.slug ||
        item.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
    };
    delete (clean as Partial<Item>).kind;
    const next = {
      ...content,
      projects:
        item.kind === "project"
          ? [
              ...content.projects.filter((x) => x.slug !== editing?.slug),
              clean as ManagedProject,
            ]
          : content.projects,
      demos:
        item.kind === "demo"
          ? [
              ...content.demos.filter((x) => x.slug !== editing?.slug),
              clean as ManagedDemo,
            ]
          : content.demos,
    };
    if (await persist(next)) setEditing(null);
  }
  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const form = new FormData();
    form.append("file", file);
    setNotice("Enviando imagem...");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      setNotice(data.error);
      return;
    }
    setEditing({ ...editing, image: data.url });
    setNotice("Imagem enviada. Salve o item para publicar.");
  }
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }
  return (
    <main className="admin">
      <aside className="admin-sidebar">
        <Logo />
        <nav>
          {sections.map(([name, Icon]) => (
            <button
              key={name}
              className={active === name ? "active" : ""}
              onClick={() => setActive(name)}
            >
              <Icon />
              {name}
              {!["Visão geral", "Projetos", "Demonstrações"].includes(name) && (
                <small>Em breve</small>
              )}
            </button>
          ))}
        </nav>
        <div className="admin-user">
          <span>ZS</span>
          <div>
            <b>zszoro</b>
            <small>Proprietário</small>
          </div>
          <button onClick={logout} aria-label="Sair">
            <I.LogOut />
          </button>
        </div>
      </aside>
      <section className="admin-main">
        <header>
          <div>
            <span className="eyebrow">Vortex Control / {active}</span>
            <h1>{active}</h1>
          </div>
          <div className="admin-actions">
            <a href="/" target="_blank">
              <I.ExternalLink /> Ver site
            </a>
            {["Projetos", "Demonstrações"].includes(active) && (
              <button
                className="btn primary"
                onClick={() =>
                  setEditing(blank(active === "Projetos" ? "project" : "demo"))
                }
              >
                <I.Plus /> Novo item
              </button>
            )}
          </div>
        </header>
        {notice && (
          <div className="admin-notice">
            <I.Radio />
            {notice}
            <button onClick={() => setNotice("")}>
              <I.X />
            </button>
          </div>
        )}
        {active === "Visão geral" ? (
          <Dashboard content={content} onNavigate={setActive} />
        ) : active === "Projetos" || active === "Demonstrações" ? (
          <>
            <div className="admin-toolbar">
              <label>
                <I.Search />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Pesquisar em ${active.toLowerCase()}...`}
                />
              </label>
              <span>{items.length} itens publicados</span>
            </div>
            <div className="admin-list">
              {items
                .filter((x) =>
                  x.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((x) => (
                  <article key={x.slug}>
                    <div
                      className="admin-item-image"
                      style={{
                        backgroundImage: x.image
                          ? `url(${x.image})`
                          : undefined,
                      }}
                    >
                      {!x.image && <I.Image />}
                    </div>
                    <div>
                      <span>{"category" in x ? x.category : x.type}</span>
                      <h3>{x.name}</h3>
                      <p>{"description" in x ? x.description : x.tagline}</p>
                      <div className="tags">
                        {x.tech.map((t) => (
                          <i key={t}>{t}</i>
                        ))}
                      </div>
                    </div>
                    <div className="admin-row-actions">
                      <a
                        href={
                          x.url ||
                          `/${active === "Projetos" ? "projetos" : "demonstracoes"}/${x.slug}`
                        }
                        target="_blank"
                        aria-label="Abrir"
                      >
                        <I.ExternalLink />
                      </a>
                      <button
                        onClick={() =>
                          setEditing({
                            ...x,
                            kind: active === "Projetos" ? "project" : "demo",
                          } as Item)
                        }
                        aria-label="Editar"
                      >
                        <I.Pencil />
                      </button>
                      <button
                        onClick={() =>
                          remove({
                            ...x,
                            kind: active === "Projetos" ? "project" : "demo",
                          } as Item)
                        }
                        aria-label="Excluir"
                      >
                        <I.Trash2 />
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </>
        ) : (
          <ComingSoon name={active} />
        )}
      </section>
      {editing && (
        <Editor
          item={editing}
          setItem={setEditing}
          close={() => setEditing(null)}
          save={saveItem}
          upload={upload}
          saving={saving}
        />
      )}
    </main>
  );
}
function Dashboard({
  content,
  onNavigate,
}: {
  content: SiteContent;
  onNavigate: (s: string) => void;
}) {
  return (
    <>
      <div className="admin-stats">
        {(
          [
          [I.Eye, "Visitantes", "—", "Conecte o Analytics"],
          [
            I.BriefcaseBusiness,
            "Projetos",
            content.projects.length,
            "Publicados",
          ],
          [I.MonitorPlay, "Demonstrações", content.demos.length, "Navegáveis"],
          [I.MessageSquareText, "Orçamentos", "—", "Formulário via WhatsApp"],
          ] as Array<[LucideIcon, string, string | number, string]>
        ).map(([Icon, t, v, s]) => (
          <article key={String(t)}>
            <Icon />
            <span>{String(t)}</span>
            <b>{String(v)}</b>
            <small>{String(s)}</small>
          </article>
        ))}
      </div>
      <div className="admin-panels">
        <article>
          <span className="eyebrow">Atividade</span>
          <h2>Conteúdo publicado</h2>
          <div className="admin-chart">
            {[35, 48, 42, 68, 57, 80, 73, 92, 86, 100, 82, 94].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </article>
        <article>
          <span className="eyebrow">Acesso rápido</span>
          <h2>Gerencie o site</h2>
          <button onClick={() => onNavigate("Projetos")}>
            <I.BriefcaseBusiness /> Projetos <I.ArrowRight />
          </button>
          <button onClick={() => onNavigate("Demonstrações")}>
            <I.MonitorPlay /> Demonstrações <I.ArrowRight />
          </button>
          <a href="/" target="_blank">
            <I.ExternalLink /> Abrir site principal <I.ArrowRight />
          </a>
        </article>
      </div>
    </>
  );
}
function ComingSoon({ name }: { name: string }) {
  return (
    <div className="coming">
      <I.Construction />
      <h2>{name}</h2>
      <p>
        O módulo está preparado na arquitetura do painel e será ativado em uma
        próxima etapa.
      </p>
    </div>
  );
}
function Editor({
  item,
  setItem,
  close,
  save,
  upload,
  saving,
}: {
  item: Item;
  setItem: (x: Item) => void;
  close: () => void;
  save: (x: Item) => void;
  upload: (e: ChangeEvent<HTMLInputElement>) => void;
  saving: boolean;
}) {
  const [other, setOther] = useState("");
  const change = (key: string, value: unknown) =>
    setItem({ ...item, [key]: value } as Item);
  function toggleTech(t: string) {
    change(
      "tech",
      item.tech.includes(t)
        ? item.tech.filter((x) => x !== t)
        : [...item.tech, t],
    );
  }
  function addOther() {
    if (other.trim() && !item.tech.includes(other.trim())) {
      change("tech", [...item.tech, other.trim()]);
      setOther("");
    }
  }
  return (
    <div className="editor-backdrop">
      <section className="editor" role="dialog" aria-modal="true">
        <header>
          <div>
            <span className="eyebrow">Editor de conteúdo</span>
            <h2>{item.name || "Novo item"}</h2>
          </div>
          <button onClick={close}>
            <I.X />
          </button>
        </header>
        <div className="editor-body">
          <div className="editor-fields">
            <label>
              Nome
              <input
                value={item.name}
                onChange={(e) => change("name", e.target.value)}
                required
              />
            </label>
            <div className="field-row">
              <label>
                Slug
                <input
                  value={item.slug}
                  onChange={(e) => change("slug", e.target.value)}
                  placeholder="gerado automaticamente"
                />
              </label>
              <label>
                {item.kind === "project" ? "Categoria" : "Tipo"}
                <input
                  value={item.kind === "project" ? item.category : item.type}
                  onChange={(e) =>
                    change(
                      item.kind === "project" ? "category" : "type",
                      e.target.value,
                    )
                  }
                />
              </label>
            </div>
            <label>
              Descrição curta
              <textarea
                rows={3}
                value={
                  item.kind === "project" ? item.description : item.tagline
                }
                onChange={(e) =>
                  change(
                    item.kind === "project" ? "description" : "tagline",
                    e.target.value,
                  )
                }
              />
            </label>
            <label>
              Descrição completa
              <textarea
                rows={4}
                value={
                  item.kind === "project"
                    ? item.longDescription || item.description
                    : item.description || ""
                }
                onChange={(e) => change("longDescription", e.target.value)}
              />
            </label>
            <label>
              URL do site
              <input
                type="url"
                value={item.url || ""}
                onChange={(e) => change("url", e.target.value)}
                placeholder="https://... ou /demonstracoes/..."
              />
            </label>
            <div className="field-row">
              <label>
                URL da imagem
                <input
                  type="url"
                  value={item.image || ""}
                  onChange={(e) => change("image", e.target.value)}
                  placeholder="https://..."
                />
              </label>
              <label className="upload-field">
                Ou enviar da pasta
                <input type="file" accept="image/*" onChange={upload} />
                <span>
                  <I.Upload /> Selecionar imagem
                </span>
              </label>
            </div>
            {item.kind === "demo" && (
              <label>
                Cor de destaque
                <input
                  type="color"
                  value={item.accent}
                  onChange={(e) => change("accent", e.target.value)}
                />
              </label>
            )}
            <fieldset>
              <legend>Tecnologias utilizadas</legend>
              <div className="tech-select">
                {technologies.map((t) => (
                  <button
                    type="button"
                    className={item.tech.includes(t) ? "selected" : ""}
                    onClick={() => toggleTech(t)}
                    key={t}
                  >
                    {item.tech.includes(t) && <I.Check />}
                    {t}
                  </button>
                ))}
              </div>
              <div className="other-tech">
                <input
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  placeholder="Outra tecnologia..."
                />
                <button type="button" onClick={addOther}>
                  <I.Plus /> Adicionar
                </button>
              </div>
            </fieldset>
          </div>
          <aside
            className="editor-preview"
            style={{
              backgroundImage: item.image
                ? `linear-gradient(0deg,rgba(5,5,5,.8),rgba(5,5,5,.1)),url(${item.image})`
                : undefined,
            }}
          >
            <span>PRÉVIA</span>
            <h3>{item.name || "Nome do projeto"}</h3>
            <p>{item.kind === "project" ? item.description : item.tagline}</p>
            <div className="tags">
              {item.tech.map((t) => (
                <i key={t}>{t}</i>
              ))}
            </div>
          </aside>
        </div>
        <footer>
          <button className="btn ghost" onClick={close}>
            Cancelar
          </button>
          <button
            className="btn primary"
            onClick={() => save(item)}
            disabled={saving || !item.name}
          >
            {saving ? "Publicando..." : "Salvar e atualizar página"}
            <I.RefreshCw />
          </button>
        </footer>
      </section>
    </div>
  );
}

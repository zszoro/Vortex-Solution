import * as Icons from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Accordion } from "@/components/Accordion";
import { QuoteModal } from "@/components/QuoteModal";
import { ProjectGrid } from "@/components/ProjectGrid";
import { DemoCarousel } from "@/components/DemoCarousel";
import { ContentAutoRefresh } from "@/components/ContentAutoRefresh";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { plans, services, siteConfig } from "@/data/site";
import { getContent } from "@/lib/content";
const iconMap = {
  Globe2: Icons.Globe2,
  PanelsTopLeft: Icons.PanelsTopLeft,
  ShoppingBag: Icons.ShoppingBag,
  Smartphone: Icons.Smartphone,
  ChartNoAxesCombined: Icons.ChartNoAxesCombined,
  Cable: Icons.Cable,
  Bot: Icons.Bot,
  Workflow: Icons.Workflow,
  Braces: Icons.Braces,
  Boxes: Icons.Boxes,
};
export const dynamic = "force-dynamic";
export default async function Home() {
  const content = await getContent();
  return (
    <>
      <ContentAutoRefresh />
      <Header />
      <main>
        <section id="inicio" className="hero">
          <div className="hero-bg">
            <i />
            <i />
            <i />
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="pill">
                <i /> Tecnologia que transforma negócios
              </span>
              <h1>
                Construímos o <span>futuro digital</span> da sua empresa.
              </h1>
              <p>
                A Vortex Studio desenvolve sites, lojas, aplicativos, automações
                e sistemas completos para transformar ideias em experiências
                digitais rápidas, modernas e preparadas para crescer.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#orcamento" data-quote>
                  Realizar orçamento <Icons.ArrowRight />
                </a>
                <a className="btn ghost" href="#projetos">
                  Explorar projetos <Icons.ArrowDownRight />
                </a>
              </div>
              <div className="trust">
                <span>
                  <Icons.Sparkles /> Design exclusivo
                </span>
                <span>
                  <Icons.Code2 /> Desenvolvimento profissional
                </span>
                <span>
                  <Icons.Headphones /> Suporte especializado
                </span>
              </div>
            </div>
            <div className="dashboard">
              <div className="dash-top">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <b>VORTEX / CONTROL</b>
                <em>AO VIVO</em>
              </div>
              <div className="dash-body">
                <aside>
                  <b>V</b>
                  {[
                    Icons.LayoutDashboard,
                    Icons.BarChart3,
                    Icons.Users,
                    Icons.Settings,
                  ].map((I, i) => (
                    <I key={i} />
                  ))}
                </aside>
                <div className="dash-content">
                  <small>VISÃO GERAL</small>
                  <h3>Performance do negócio</h3>
                  <div className="dash-stats">
                    <div>
                      <span>Conversão</span>
                      <b>+24.8%</b>
                      <i />
                    </div>
                    <div>
                      <span>Operações</span>
                      <b>1.284</b>
                      <i />
                    </div>
                    <div>
                      <span>Eficiência</span>
                      <b>98.2%</b>
                      <i />
                    </div>
                  </div>
                  <div className="chart">
                    <span>RESULTADOS</span>
                    {[35, 48, 42, 68, 57, 80, 73, 92, 86, 100].map((h, i) => (
                      <i style={{ height: `${h}%` }} key={i} />
                    ))}
                  </div>
                  <div className="dash-row">
                    <span>
                      Integrações ativas <b>12</b>
                    </span>
                    <span>
                      Uptime <b>99.9%</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="tech-strip">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "APIs",
            "Firebase",
            "Mercado Pago",
            "PIX",
            "Analytics",
          ].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <section id="projetos" className="section dark-section home-showcase">
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow="Projetos conceituais"
                title="Experiências que tornam a tecnologia tangível."
                text="Cases demonstrativos criados para apresentar abordagens, estilos e possibilidades. Não representam clientes reais."
              />
            </Reveal>
            <ProjectGrid projects={content.projects} />
          </div>
        </section>
        <section id="demonstracoes" className="section container home-showcase">
          <Reveal>
            <SectionTitle
              eyebrow="Veja funcionando"
              title="Demonstrações navegáveis, não apenas telas bonitas."
              text="Explore catálogos, use a busca, abra detalhes e simule ações como em um produto real."
            />
          </Reveal>
          <DemoCarousel demos={content.demos} />
        </section>
        <section id="sobre" className="section container">
          <Reveal>
            <div className="about-grid">
              <SectionTitle
                eyebrow="Além do óbvio"
                title="Não criamos apenas sites. Construímos estruturas digitais completas."
              />
              <div>
                <p className="large-copy">
                  Cada projeto combina estratégia, design, tecnologia,
                  integrações e suporte para criar uma solução alinhada à
                  realidade do seu negócio.
                </p>
                <p>
                  Da primeira ideia à evolução contínua, cuidamos da
                  experiência, da arquitetura e dos detalhes que transformam uma
                  interface bonita em uma ferramenta de crescimento.
                </p>
              </div>
            </div>
            <div className="capabilities">
              {[
                [
                  Icons.MonitorSmartphone,
                  "Responsivo",
                  "Experiências consistentes em qualquer tela",
                ],
                [Icons.Unplug, "Sob medida", "Integrações para a sua operação"],
                [
                  Icons.Layers3,
                  "Escalável",
                  "Base preparada para o próximo nível",
                ],
                [Icons.LifeBuoy, "Acompanhado", "Suporte depois da entrega"],
              ].map(([I, t, d]) => (
                <div key={String(t)}>
                  <I />
                  <span>CAPACIDADE</span>
                  <b>{String(t)}</b>
                  <p>{String(d)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <section id="servicos" className="section dark-section">
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow="O que construímos"
                title="Tecnologia completa, do conceito à operação."
                text="Um time e uma arquitetura para transformar desafios complexos em produtos digitais claros, rápidos e confiáveis."
              />
            </Reveal>
            <div className="service-grid">
              {services.map(([name, desc, icon], i) => {
                const I = iconMap[icon];
                return (
                  <Reveal key={name}>
                    <article className={`service-card s${i}`}>
                      <span>0{i + 1}</span>
                      <I />
                      <h3>{name}</h3>
                      <p>{desc}</p>
                      <a href="#orcamento" data-quote aria-label={`Solicitar ${name}`}>
                        Explorar solução <Icons.ArrowUpRight />
                      </a>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
        <section id="planos" className="section container">
          <Reveal>
            <SectionTitle
              eyebrow="Formatos de projeto"
              title="O ponto de partida certo para cada ambição."
              text="Escopo, investimento e cronograma são definidos com transparência. Os formatos abaixo ajudam a orientar a primeira conversa."
            />
          </Reveal>
          <div className="plan-grid">
            {plans.map((p) => (
              <article
                className={p.featured ? "plan featured" : "plan"}
                key={p.name}
              >
                {p.featured && (
                  <span className="recommended">MAIS ESCOLHIDO</span>
                )}
                <small>{p.audience}</small>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <strong>Solicite uma proposta</strong>
                <em>{p.timeline}</em>
                <ul>
                  {p.features.map((x) => (
                    <li key={x}>
                      <Icons.Check /> {x}
                    </li>
                  ))}
                </ul>
                <a
                  className={p.featured ? "btn primary" : "btn ghost"}
                  href="#orcamento"
                  data-quote
                >
                  Realizar orçamento <Icons.ArrowRight />
                </a>
              </article>
            ))}
          </div>
        <div
          className="comparison"
          tabIndex={0}
          role="region"
          aria-label="Comparação dos planos; deslize horizontalmente em telas pequenas"
        >
            <div>
              <b>Comparação rápida</b>
              <span>Essencial</span>
              <span>Profissional</span>
              <span>Sob Medida</span>
            </div>
            {[
              ["Presença digital", "Incluído", "Incluído", "Incluído"],
              ["Painel e integrações", "Opcional", "Incluído", "Personalizado"],
              ["API e automações", "—", "Selecionadas", "Completo"],
              ["Evolução contínua", "Opcional", "Disponível", "Planejada"],
            ].map((r) => (
              <div key={r[0]}>
                {r.map((x, i) =>
                  i === 0 ? <b key={x}>{x}</b> : <span key={i}>{x}</span>,
                )}
              </div>
            ))}
          </div>
        </section>
        <section id="processo" className="section dark-section">
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow="Do primeiro contato à evolução"
                title="Um processo claro. Nenhuma caixa-preta."
              />
            </Reveal>
            <div className="timeline">
              {[
                [
                  Icons.MessageSquare,
                  "Contato",
                  "Entendemos o momento, os objetivos e as prioridades.",
                ],
                [
                  Icons.Map,
                  "Escolha da solução",
                  "Definimos o formato que melhor responde ao desafio.",
                ],
                [
                  Icons.PenTool,
                  "Planejamento",
                  "Organizamos escopo, conteúdo, arquitetura e identidade.",
                ],
                [
                  Icons.Code2,
                  "Desenvolvimento",
                  "Construímos com checkpoints e comunicação constante.",
                ],
                [
                  Icons.ScanSearch,
                  "Revisão e entrega",
                  "Testamos, refinamos e publicamos com segurança.",
                ],
                [
                  Icons.Rocket,
                  "Suporte e evolução",
                  "Acompanhamos resultados e planejamos os próximos passos.",
                ],
              ].map(([I, t, d], i) => (
                <Reveal key={String(t)}>
                  <article>
                    <span>0{i + 1}</span>
                    <I />
                    <h3>{String(t)}</h3>
                    <p>{String(d)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section container">
          <Reveal>
            <SectionTitle
              eyebrow="Relatos ilustrativos"
              title="Parcerias construídas com clareza e confiança."
              text="Os depoimentos abaixo são exemplos editáveis de apresentação e não correspondem a clientes reais."
            />
          </Reveal>
          <div className="testimonials">
            {[
              [
                "MC",
                "Marina Costa",
                "Diretora de Operações",
                "A equipe traduziu um processo complexo em uma experiência simples. Cada decisão foi explicada e o resultado ficou pronto para evoluir.",
              ],
              [
                "RL",
                "Rafael Lima",
                "Empreendedor digital",
                "Do planejamento à entrega, tivemos visibilidade real do projeto. O cuidado com desempenho e detalhes fez toda a diferença.",
              ],
              [
                "AP",
                "Ana Prado",
                "Gestora de E-commerce",
                "A nova estrutura organizou catálogo, vendas e atendimento em um único fluxo. Uma parceria objetiva e muito próxima.",
              ],
            ].map((x) => (
              <article key={x[1]}>
                <div className="stars">
                  ★★★★★ <span>EXEMPLO</span>
                </div>
                <p>“{x[3]}”</p>
                <div>
                  <i>{x[0]}</i>
                  <span>
                    <b>{x[1]}</b>
                    <small>{x[2]}</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="faq" className="section dark-section">
          <div className="container faq-grid">
            <Reveal>
              <SectionTitle
                eyebrow="Perguntas frequentes"
                title="Informação clara antes de começarmos."
                text="Se sua dúvida não estiver aqui, fale com a gente. A primeira conversa é direta e sem compromisso."
              />
            </Reveal>
            <Accordion />
          </div>
        </section>
      </main>
      <QuoteModal />
      <a
        className="whatsapp"
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Olá! Conheci a Vortex Studio pelo site e desejo solicitar um orçamento.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar pelo WhatsApp"
      >
        <WhatsAppIcon />
      </a>
      <Footer />
    </>
  );
}

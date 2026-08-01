"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, Globe2, LoaderCircle, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const projectTypes = [
  "Site institucional",
  "Landing page",
  "Loja virtual",
  "Painel administrativo",
  "Sistema personalizado",
  "Automação ou integração",
  "Bot",
  "Aplicativo mobile",
  "Aplicativo desktop",
  "Aplicativo iOS",
];

const hostingOptions = [
  { id: "vercel", suffix: "vercel.app", name: "Vercel", detail: "Hospedagem com endereço Vercel", price: "R$ 30,00/mês" },
  { id: "com", suffix: "com", name: "Domínio .com", detail: "Domínio personalizado internacional", price: "R$ 79,90/mês" },
  { id: "combr", suffix: "com.br", name: "Domínio .com.br", detail: "Domínio personalizado brasileiro", price: "R$ 69,90/mês" },
  { id: "net", suffix: "net", name: "Domínio .net", detail: "Domínio clássico para tecnologia", price: "R$ 89,90/mês" },
  { id: "app", suffix: "app", name: "Domínio .app", detail: "Domínio moderno para aplicativos", price: "R$ 129,90/mês" },
  { id: "io", suffix: "io", name: "Domínio .io", detail: "Domínio premium para produtos digitais", price: "R$ 159,90/mês" },
];

type DomainStatus = "idle" | "checking" | "available" | "taken" | "unknown";

export function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [hosting, setHosting] = useState("vercel");
  const [domainName, setDomainName] = useState("");
  const [domainStatuses, setDomainStatuses] = useState<Record<string, DomainStatus>>({});

  useEffect(() => {
    const click = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest("[data-quote]");
      if (!trigger) return;
      event.preventDefault();
      setStep(1);
      setOpen(true);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const clean = domainName.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");
    if (!open || step !== 2 || clean.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/domain-check?name=${encodeURIComponent(clean)}`, { signal: controller.signal });
        if (!response.ok) throw new Error("domain-check");
        const data = await response.json() as { results: Record<string, { status: DomainStatus }> };
        setDomainStatuses(Object.fromEntries(Object.entries(data.results).map(([suffix, value]) => [suffix, value.status])));
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setDomainStatuses(Object.fromEntries(hostingOptions.map((item) => [item.suffix, "unknown"])));
        }
      }
    }, 550);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [domainName, open, step]);

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep(2);
  }

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = hostingOptions.find((item) => item.id === hosting)!;
    const selectedDomain = `${domainName || "meusite"}.${selected.suffix}`;
    const message = [
      "*NOVO PEDIDO DE ORÇAMENTO — VORTEX STUDIO*",
      "",
      "*DADOS DO CLIENTE*",
      `Nome: ${data.get("nome")}`,
      `Empresa: ${data.get("empresa") || "Não informada"}`,
      `E-mail: ${data.get("email")}`,
      `WhatsApp: ${data.get("whatsapp")}`,
      "",
      "*PROJETO*",
      `Tipo: ${data.get("projeto")}`,
      `Faixa de investimento informada: ${data.get("investimento")}`,
      "",
      "*HOSPEDAGEM E DOMÍNIO*",
      `Opção: ${selected.name}`,
      `Endereço desejado: ${selectedDomain}`,
      `Detalhes: ${selected.detail}`,
      `Mensalidade de referência: ${selected.price}`,
      "",
      "Aguardo a análise e o preço final do projeto.",
    ].join("\n");
    const number = siteConfig.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div className="quote-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <section className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <header>
          <div>
            <span>ORÇAMENTO PERSONALIZADO</span>
            <h2 id="quote-title">Conte sobre o seu projeto</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fechar orçamento"><X /></button>
        </header>
        <div className="quote-progress">
          <span className="active"><i>1</i> Projeto</span><b /><span className={step === 2 ? "active" : ""}><i>2</i> Hospedagem</span>
        </div>
        <form onSubmit={step === 1 ? next : send}>
          <div className={step === 1 ? "quote-step active" : "quote-step"}>
            <div className="field-row">
              <label>Nome<input name="nome" required minLength={2} placeholder="Seu nome" /></label>
              <label>Empresa <small>(opcional)</small><input name="empresa" placeholder="Nome da empresa" /></label>
            </div>
            <div className="field-row">
              <label>E-mail<input name="email" type="email" required placeholder="voce@empresa.com" /></label>
              <label>WhatsApp<input name="whatsapp" required minLength={8} placeholder="(00) 00000-0000" /></label>
            </div>
            <label>Tipo de projeto<select name="projeto" required defaultValue=""><option value="" disabled>Selecione o projeto</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label>Faixa de investimento<input name="investimento" required placeholder="Escreva o valor ou a faixa que pretende investir" /></label>
          </div>
          <div className={step === 2 ? "quote-step active" : "quote-step"}>
            <div className="quote-hosting-intro"><Globe2 /><div><b>Escolha a hospedagem e o endereço</b><p>Digite o nome uma vez para conferir todas as extensões ao mesmo tempo.</p></div></div>
            <label className="domain-name-field">Nome desejado para o site
              <div><Globe2 /><input value={domainName} onChange={(event) => { const value = event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""); setDomainName(value); setDomainStatuses(value.length >= 2 ? Object.fromEntries(hostingOptions.map((item) => [item.suffix, "checking"])) : {}); }} required={step === 2} minLength={2} placeholder="minhaempresa" /><span>.domínio</span></div>
              <small>A disponibilidade é consultada em tempo real e pode mudar até o registro.</small>
            </label>
            <div className="hosting-options">
              {hostingOptions.map((item) => { const status = domainStatuses[item.suffix] || "idle"; return <label className={hosting === item.id ? "selected" : ""} key={item.id}>
                <input type="radio" name="hosting" value={item.id} checked={hosting === item.id} onChange={() => setHosting(item.id)} />
                <Building2 /><span><b>{domainName || "meusite"}.{item.suffix}</b><small>{item.detail}</small></span><strong>{item.price}</strong><Check />
                <em className={`domain-status ${status}`}>{status === "checking" ? <LoaderCircle /> : <i />}{status === "available" ? "Disponível" : status === "taken" ? "Indisponível" : status === "unknown" ? "Não confirmado" : "Digite o nome"}</em>
              </label>})}
            </div>
          </div>
          <footer>
            {step === 2 && <button className="btn ghost" type="button" onClick={() => setStep(1)}><ArrowLeft /> Voltar</button>}
            <button className="btn primary" type="submit">{step === 1 ? <>Continuar <ArrowRight /></> : <><WhatsAppIcon /> Enviar orçamento pelo WhatsApp</>}</button>
          </footer>
        </form>
      </section>
    </div>
  );
}

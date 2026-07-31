export const siteConfig = {
  name: "Vortex Studio",
  url: "https://vortex-solution-lilac.vercel.app",
  email: "SEU_EMAIL",
  whatsapp: "SEU_NUMERO_WHATSAPP",
  discord: "SEU_USUARIO_DISCORD",
  instagram: "SEU_INSTAGRAM",
};

export const nav = [
  ["Início", "#inicio"], ["Sobre", "#sobre"], ["Serviços", "#servicos"],
  ["Planos", "#planos"], ["Projetos", "#projetos"], ["Demonstrações", "#demonstracoes"],
  ["Processo", "#processo"], ["FAQ", "#faq"], ["Contato", "#contato"],
] as const;

export const services = [
  ["Sites Institucionais", "Presença digital estratégica, rápida e pronta para converter.", "Globe2"],
  ["Landing Pages", "Páginas focadas em campanhas, lançamentos e geração de leads.", "PanelsTopLeft"],
  ["Lojas Virtuais", "Catálogos, pagamentos e gestão para vender sem limites.", "ShoppingBag"],
  ["Aplicativos", "Experiências móveis intuitivas conectadas ao seu negócio.", "Smartphone"],
  ["Painéis Administrativos", "Dados, operações e decisões reunidos em uma interface clara.", "ChartNoAxesCombined"],
  ["Integrações", "Ferramentas e plataformas conversando de forma segura.", "Cable"],
  ["Bots", "Atendimento ágil e disponível para clientes e equipes.", "Bot"],
  ["Automações", "Menos tarefas repetitivas, mais tempo para crescer.", "Workflow"],
  ["APIs", "Arquiteturas robustas para conectar produtos e dados.", "Braces"],
  ["Sistemas Personalizados", "Software desenhado em torno da sua operação real.", "Boxes"],
] as const;

export const plans = [
  {name:"Essencial", audience:"Profissionais e pequenos negócios", description:"Comece com uma presença digital sólida e profissional.", timeline:"A partir de 10 dias úteis", features:["Site responsivo","Até 5 páginas","SEO essencial","Formulário de contato","Suporte de lançamento"]},
  {name:"Profissional", audience:"Empresas em crescimento", description:"Venda, automatize e administre sua operação digital.", timeline:"A partir de 20 dias úteis", featured:true, features:["Tudo do Essencial","Painel administrativo","Integrações e automações","Analytics avançado","Suporte prioritário"]},
  {name:"Sob Medida", audience:"Operações e produtos digitais", description:"Plataformas, apps, lojas e sistemas sem limitações de formato.", timeline:"Após diagnóstico técnico", features:["Arquitetura personalizada","API e banco de dados","Checkout e autenticação","Escalabilidade planejada","Evolução contínua"]},
];

export const projects = [
  {slug:"nexus-gaming",name:"Nexus Gaming Store",category:"E-commerce",year:"2026",tech:["Next.js","PIX","Dashboard"],description:"Loja gamer imersiva com catálogo, combos e checkout demonstrativo.",tone:"purple"},
  {slug:"aura-fashion",name:"Aura Fashion",category:"E-commerce",year:"2026",tech:["React","Filtros","Mobile"],description:"Experiência editorial para uma marca de moda contemporânea.",tone:"rose"},
  {slug:"volt-electronics",name:"Volt Electronics",category:"E-commerce",year:"2026",tech:["TypeScript","Busca","Cartão"],description:"Catálogo tecnológico focado em comparação e descoberta.",tone:"blue"},
  {slug:"saborize",name:"Saborize Restaurante",category:"Experiência",year:"2026",tech:["Cardápio","Pedidos","Localização"],description:"Cardápio digital acolhedor com pedidos rápidos e navegação fluida.",tone:"orange"},
  {slug:"vortex-admin",name:"Vortex Admin Dashboard",category:"Sistemas",year:"2026",tech:["Analytics","RBAC","API"],description:"Central operacional para métricas, vendas e performance.",tone:"cyan"},
  {slug:"flowbot",name:"FlowBot Automation",category:"Automação",year:"2026",tech:["Bots","Workflows","IA"],description:"Orquestração visual de atendimento e tarefas recorrentes.",tone:"green"},
];

export const demos = [
  {slug:"loja-gamer",name:"Arcade Core",type:"Loja Gamer",accent:"#8b5cf6",tagline:"Performance para quem joga sério."},
  {slug:"moda",name:"Alba",type:"Loja de Roupas",accent:"#e879a9",tagline:"Essenciais para o seu ritmo."},
  {slug:"eletronicos",name:"NOVA",type:"Eletrônicos",accent:"#3b82f6",tagline:"Tecnologia que simplifica."},
  {slug:"restaurante",name:"Brasa",type:"Restaurante",accent:"#f97316",tagline:"Comida viva, feita agora."},
  {slug:"marketplace",name:"Orbit",type:"Marketplace",accent:"#22c55e",tagline:"Boas escolhas em um só lugar."},
];

export const faq = [
  ["Quanto tempo leva para desenvolver um projeto?","Depende do escopo. Projetos institucionais começam a partir de 10 dias úteis; sistemas maiores recebem um cronograma após o diagnóstico."],
  ["Posso solicitar alterações durante o desenvolvimento?","Sim. O processo inclui checkpoints de revisão para manter a solução alinhada às suas expectativas."],
  ["O site funcionará em celulares?","Sim. Todo projeto é criado com abordagem responsiva e testado em diferentes tamanhos de tela."],
  ["Vocês integram Mercado Pago, PIX e cartão?","Sim. Implementamos meios de pagamento e fluxos de checkout de acordo com a necessidade do projeto."],
  ["O projeto inclui painel administrativo?","Pode incluir. Painéis são definidos conforme o conteúdo e os processos que sua equipe precisa gerenciar."],
  ["A Vortex Studio oferece hospedagem?","Ajudamos na configuração, publicação e monitoramento em plataformas modernas como a Vercel."],
  ["Posso contratar suporte após a entrega?","Sim. Oferecemos planos de suporte e evolução contínua sob medida."],
  ["Vocês desenvolvem sistemas totalmente personalizados?","Sim. Criamos APIs, dashboards, automações, aplicativos e plataformas adaptadas à operação."],
  ["O código e o domínio ficam em meu nome?","Sim. A titularidade e os acessos são organizados de forma transparente no contrato."],
  ["Como solicito um orçamento?","Preencha o formulário ao final da página ou fale conosco pelo botão do WhatsApp."],
] as const;

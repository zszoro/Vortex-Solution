# Vortex Studio

Site institucional completo da Vortex Studio, desenvolvido com Next.js, TypeScript e CSS moderno. Inclui página principal responsiva, portfólio conceitual, páginas de projetos, cinco demonstrações navegáveis, formulário via WhatsApp, páginas legais e SEO técnico.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validação

```bash
npm run lint
npm run typecheck
npm run build
```

## Personalização

- Contatos: edite `src/data/site.ts`, no objeto `siteConfig`.
- Planos e serviços: edite os arrays `plans` e `services` no mesmo arquivo.
- Projetos e demonstrações: edite `projects` e `demos`.
- URL pública: altere `siteConfig.url` para o domínio definitivo antes do deploy.

Os placeholders `SEU_NUMERO_WHATSAPP`, `SEU_EMAIL`, `SEU_USUARIO_DISCORD` e `SEU_INSTAGRAM` devem ser substituídos pelos canais oficiais. O formulário não simula envio de e-mail: ele valida os campos e abre uma mensagem organizada no WhatsApp.

## Deploy na Vercel

Importe este repositório na Vercel ou execute `vercel`. O projeto não depende de variáveis de ambiente ou serviços externos para funcionar. Após publicar, atualize `siteConfig.url` com o endereço final para manter sitemap e metadados corretos.

O arquivo `vercel.json` fixa o preset de framework como Next.js e a saída de build em `.next`, evitando que configurações antigas de hospedagem estática procurem uma pasta `public`.

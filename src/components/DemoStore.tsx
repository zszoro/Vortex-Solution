"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import type { ManagedDemo } from "@/lib/content";
const photos = [
  "photo-1523275335684-37898b6baf30",
  "photo-1505740420928-5e560c06d30e",
  "photo-1542291026-7eec264c27ff",
  "photo-1526170375885-4d8ecf77b99f",
  "photo-1572635196237-14b3f281503f",
  "photo-1560343090-f0409e92791a",
];
const base = [
  ["Pulse One", "Edição premium com acabamento preciso", 189],
  ["Core Pro", "O favorito da comunidade", 249],
  ["Air Shift", "Leve, versátil e feito para o dia", 129],
  ["Nova Max", "Desempenho elevado, sem excessos", 329],
  ["Orbit Mini", "Compacto por fora, completo por dentro", 99],
  ["Studio X", "Design autoral para quem exige mais", 419],
] as const;
type Product = (typeof base)[number];
type CartItem = { product: Product; qty: number };
export function DemoStore({ demo }: { demo: ManagedDemo }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [approved, setApproved] = useState(false);
  const products = useMemo(
    () => base.filter((p) => p[0].toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const total = cart.reduce((s, x) => s + x.product[2] * x.qty, 0);
  function add(product: Product) {
    setCart((c) => {
      const found = c.find((x) => x.product[0] === product[0]);
      return found
        ? c.map((x) =>
            x.product[0] === product[0] ? { ...x, qty: x.qty + 1 } : x,
          )
        : [...c, { product, qty: 1 }];
    });
    setDrawer(true);
  }
  function qty(name: string, delta: number) {
    setCart((c) =>
      c
        .map((x) => (x.product[0] === name ? { ...x, qty: x.qty + delta } : x))
        .filter((x) => x.qty > 0),
    );
  }
  return (
    <div
      className="demo"
      style={{ "--demo": demo.accent } as React.CSSProperties}
    >
      <header className="demo-header">
        <Link href="/#demonstracoes">
          <ArrowLeft /> Vortex Studio
        </Link>
        <b>{demo.name}</b>
        <button
          aria-label={`Carrinho com ${cart.reduce((s, x) => s + x.qty, 0)} itens`}
          onClick={() => setDrawer(true)}
        >
          <Image src="/shopping-cart.png" alt="" width={22} height={22} />
          {cart.reduce((s, x) => s + x.qty, 0)}
        </button>
      </header>
      <main>
        <section
          className="demo-hero"
          style={
            demo.image
              ? {
                  backgroundImage: `linear-gradient(90deg,#111 0%,rgba(17,17,17,.82) 45%,rgba(17,17,17,.25)),url(${demo.image})`,
                }
              : undefined
          }
        >
          <span>{demo.type} · EXPERIÊNCIA DEMONSTRATIVA</span>
          <h1>{demo.tagline}</h1>
          <p>
            {demo.description ||
              "Uma demonstração navegável criada pela Vortex Studio. Explore o catálogo, pesquise produtos e simule sua compra."}
          </p>
          <a href="#catalogo">Explorar coleção</a>
        </section>
        <section id="catalogo" className="demo-catalog">
          <div className="demo-catalog-head">
            <div>
              <span>CATÁLOGO / 2026</span>
              <h2>Escolha o seu próximo favorito.</h2>
            </div>
            <label>
              <Search />
              <span className="sr-only">Pesquisar produtos</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar..."
              />
            </label>
          </div>
          <div className="demo-products">
            {products.map((p, i) => (
              <article key={p[0]}>
                <button
                  className="product-visual"
                  onClick={() => setSelected(p)}
                  aria-label={`Ver detalhes de ${p[0]}`}
                >
                  <Image
                    src={`https://images.unsplash.com/${photos[i]}?auto=format&fit=crop&w=800&q=85`}
                    alt={p[0]}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                  <span>0{i + 1}</span>
                  <em>{demo.name}</em>
                </button>
                <div>
                  <span>Lançamento</span>
                  <h3>{p[0]}</h3>
                  <p>{p[1]}</p>
                  <strong>R$ {p[2]},00</strong>
                  <button onClick={() => add(p)}>
                    <Plus /> Adicionar
                  </button>
                </div>
              </article>
            ))}
          </div>
          {products.length === 0 && (
            <p className="empty">
              Nenhum produto encontrado. Tente outro termo.
            </p>
          )}
        </section>
      </main>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes de ${selected[0]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSelected(null)}
              aria-label="Fechar"
            >
              <X />
            </button>
            <div className="product-modal-art">
              <Image
                src={`https://images.unsplash.com/${photos[base.indexOf(selected)]}?auto=format&fit=crop&w=900&q=90`}
                alt={selected[0]}
                fill
                sizes="450px"
              />
            </div>
            <div>
              <span>DEMONSTRAÇÃO · EM ESTOQUE</span>
              <h2>{selected[0]}</h2>
              <p>
                {selected[1]}. Este produto é fictício e faz parte de uma
                experiência demonstrativa.
              </p>
              <strong>R$ {selected[2]},00</strong>
              <button
                className="demo-buy"
                onClick={() => {
                  add(selected);
                  setSelected(null);
                }}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </section>
        </div>
      )}
      <aside
        className={drawer ? "cart-drawer open" : "cart-drawer"}
        aria-hidden={!drawer}
      >
        <header>
          <div>
            <ShoppingBag />
            <span>
              <b>Seu carrinho</b>
              <small>{cart.length} produtos</small>
            </span>
          </div>
          <button onClick={() => setDrawer(false)} aria-label="Fechar carrinho">
            <X />
          </button>
        </header>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <Image
                src="/shopping-cart.png"
                alt="Carrinho vazio"
                width={85}
                height={85}
              />
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione produtos para iniciar a simulação.</p>
            </div>
          ) : (
            cart.map(({ product: p, qty: q }, i) => (
              <article key={p[0]}>
                <Image
                  src={`https://images.unsplash.com/${photos[base.indexOf(p)]}?auto=format&fit=crop&w=200&q=80`}
                  alt={p[0]}
                  width={72}
                  height={72}
                />
                <div>
                  <b>{p[0]}</b>
                  <span>R$ {p[2]},00</span>
                  <div>
                    <button onClick={() => qty(p[0], -1)}>
                      <Minus />
                    </button>
                    <small>{q}</small>
                    <button onClick={() => qty(p[0], 1)}>
                      <Plus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setCart((c) => c.filter((_, x) => x !== i))}
                  aria-label="Remover"
                >
                  <Trash2 />
                </button>
              </article>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <footer>
            <div>
              <span>Subtotal</span>
              <b>R$ {total.toFixed(2).replace(".", ",")}</b>
            </div>
            <small>Frete e impostos calculados na próxima etapa</small>
            <button
              onClick={() => {
                setCheckout(true);
                setDrawer(false);
              }}
            >
              Finalizar compra <ChevronRight />
            </button>
          </footer>
        )}
      </aside>
      {drawer && (
        <button
          className="drawer-shade"
          onClick={() => setDrawer(false)}
          aria-label="Fechar carrinho"
        />
      )}
      {checkout && (
        <div className="checkout-backdrop">
          <section className="checkout">
            <button
              className="checkout-close"
              onClick={() => setCheckout(false)}
            >
              <X />
            </button>
            {approved ? (
              <div className="approved">
                <div>
                  <Image
                    src="/shopping-cart.png"
                    alt="Compra aprovada"
                    width={110}
                    height={110}
                  />
                  <Check />
                </div>
                <span>Pagamento confirmado</span>
                <h2>Compra aprovada!</h2>
                <p>Seu pedido demonstrativo foi concluído com sucesso.</p>
                <small>
                  Isso é uma demonstração. Nenhuma cobrança ou pedido real foi
                  realizado.
                </small>
                <button
                  onClick={() => {
                    setApproved(false);
                    setCheckout(false);
                    setCart([]);
                  }}
                >
                  Voltar à loja
                </button>
              </div>
            ) : (
              <>
                <div className="checkout-head">
                  <span>CHECKOUT SEGURO · DEMONSTRAÇÃO</span>
                  <h2>Finalize sua compra</h2>
                  <p>Preencha os dados para simular a experiência completa.</p>
                </div>
                <div className="checkout-grid">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setApproved(true);
                    }}
                  >
                    <h3>1. Seus dados</h3>
                    <div className="field-row">
                      <label>
                        Nome completo
                        <input required placeholder="Seu nome" />
                      </label>
                      <label>
                        CPF
                        <input required placeholder="000.000.000-00" />
                      </label>
                    </div>
                    <label>
                      E-mail
                      <input
                        type="email"
                        required
                        placeholder="voce@email.com"
                      />
                    </label>
                    <h3>2. Entrega</h3>
                    <div className="field-row">
                      <label>
                        CEP
                        <input required placeholder="00000-000" />
                      </label>
                      <label>
                        Cidade
                        <input required placeholder="Sua cidade" />
                      </label>
                    </div>
                    <label>
                      Endereço
                      <input required placeholder="Rua, número e complemento" />
                    </label>
                    <h3>3. Pagamento</h3>
                    <div className="payment-options">
                      <label>
                        <input type="radio" name="pay" defaultChecked /> PIX
                      </label>
                      <label>
                        <input type="radio" name="pay" /> Cartão
                      </label>
                    </div>
                    <button className="pay-button">
                      Pagar R$ {total.toFixed(2).replace(".", ",")}
                    </button>
                  </form>
                  <aside>
                    <h3>Resumo do pedido</h3>
                    {cart.map((x) => (
                      <div key={x.product[0]}>
                        <span>
                          {x.qty}× {x.product[0]}
                        </span>
                        <b>
                          R${" "}
                          {(x.product[2] * x.qty).toFixed(2).replace(".", ",")}
                        </b>
                      </div>
                    ))}
                    <footer>
                      <span>Total</span>
                      <b>R$ {total.toFixed(2).replace(".", ",")}</b>
                    </footer>
                    <small>
                      Ambiente demonstrativo: nenhum dado financeiro é
                      processado.
                    </small>
                  </aside>
                </div>
              </>
            )}
          </section>
        </div>
      )}
      <footer className="demo-footer">
        <b>{demo.name}</b>
        <span>Demonstração conceitual — nenhuma compra será processada.</span>
        <Link href="/">Criado pela Vortex Studio</Link>
      </footer>
    </div>
  );
}

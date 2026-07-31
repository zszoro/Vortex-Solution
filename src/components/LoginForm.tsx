"use client";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
export function LoginForm() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const d = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: d.get("email"),
        password: d.get("password"),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError((await res.json()).error);
      return;
    }
    router.push("/admin");
    router.refresh();
  }
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-brand">
          <Logo />
          <div>
            <span className="eyebrow">Vortex Control</span>
            <h1>Seu negócio digital, sob o seu controle.</h1>
            <p>
              Publique projetos, organize demonstrações e mantenha sua presença
              digital sempre atualizada.
            </p>
          </div>
          <small>Ambiente exclusivo e protegido · Vortex Studio</small>
        </div>
        <div className="auth-panel">
          <div className="auth-form-head">
            <span>
              <LockKeyhole />
            </span>
            <h2>Bem-vindo de volta</h2>
            <p>Entre com sua conta de proprietário.</p>
          </div>
          <form onSubmit={submit}>
            <label>
              E-mail
              <div>
                <Mail />
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue="zszoro818@gmail.com"
                  autoComplete="email"
                />
              </div>
            </label>
            <label>
              Senha
              <div>
                <LockKeyhole />
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                >
                  {show ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </label>
            <div className="auth-options">
              <label>
                <input type="checkbox" name="remember" /> Lembrar acesso
              </label>
              <button
                type="button"
                onClick={() =>
                  setError(
                    "A recuperação deve ser solicitada pelo canal oficial da Vortex Studio.",
                  )
                }
              >
                Esqueci minha senha
              </button>
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button className="btn primary" disabled={loading}>
              {loading ? "Entrando..." : "Entrar no painel"}
            </button>
            <div className="auth-divider">
              <span>ou continue com</span>
            </div>
            <a className="google-button" href="/api/auth/google">
              <b>G</b> Conectar com Google
            </a>
          </form>
          <p className="auth-safe">
            Sessão protegida por cookie seguro e acesso restrito ao
            proprietário.
          </p>
        </div>
      </section>
    </main>
  );
}

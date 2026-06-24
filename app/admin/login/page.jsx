"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail]     = useState("");
  const [password, setPass]   = useState("");
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="eyebrow mb-6">ADMIN ACCESS</p>
        <h1 className="serif mb-10 text-4xl font-light">
          Sign <em className="text-[var(--gold)]">in</em>
        </h1>

        <div className="space-y-4">
          <div>
            <label className="mono mb-1 block text-[9px] tracking-[.12em] text-[var(--faint)]">EMAIL</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none"/>
          </div>
          <div>
            <label className="mono mb-1 block text-[9px] tracking-[.12em] text-[var(--faint)]">PASSWORD</label>
            <input type="password" value={password} onChange={e=>setPass(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              className="w-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none"/>
          </div>

          {error && <p className="mono text-[9px] tracking-widest text-red-500">{error.toUpperCase()}</p>}

          <button onClick={handleLogin} disabled={loading}
            className="mono w-full border border-[var(--gold)] py-3 text-[10px] tracking-[.12em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--bg)] disabled:opacity-50">
            {loading ? "SIGNING IN…" : "SIGN IN →"}
          </button>
        </div>
      </div>
    </main>
  );
}

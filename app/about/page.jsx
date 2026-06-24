"use client";

import { useState } from "react";
import Image from "next/image";
import { sendContact } from "../../lib/api";

const SKILLS = ["Urban Design","Parametric Design","Sustainable Build","Interior Architecture","Heritage Restoration","BIM / Revit"];

export default function AboutPage() {
  const [form, setForm]     = useState({ name:"", email:"", projectType:"", message:"" });
  const [status, setStatus] = useState(null); // "loading" | "ok" | "error"

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      await sendContact(form);
      setStatus("ok");
      setForm({ name:"", email:"", projectType:"", message:"" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* ── LEFT — About ──────────────────────────── */}
      <section className="border-r border-[var(--border)] px-12 py-16 md:px-16">
        {/* Portrait */}
        <div className="relative mb-8 h-56 overflow-hidden">
          <Image
            src="/images/portrait.jpg"      // drop photo in /public/images/
            alt="Mohamed Abd El Azeem"
            fill
            className="object-cover brightness-75 saturate-50"
          />
          <span className="mono absolute bottom-3 right-3 text-[9px] tracking-[.1em] text-[var(--gold)]">
            CAIRO · EGYPT
          </span>
        </div>

        <p className="eyebrow mb-5">ABOUT</p>
        <h2 className="serif mb-5 text-4xl font-light leading-tight">
          Spaces that<br /><em className="text-[var(--gold)]">outlast trends</em>
        </h2>

        <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
         Cairo-based architect with 3 years of experience in residential, commercial, and cultural spaces. Graduated from Mansoura University, Faculty of Engineering.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">
          Every project starts with a single question: what does this space need to say in 50 years?
        </p>

        <p className="eyebrow mb-4">EXPERTISE</p>
        <div className="grid grid-cols-2">
          {SKILLS.map((s) => (
            <span key={s} className="mono border-b border-[var(--border)] py-2 text-[9px] tracking-[.05em] text-[var(--faint)]">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── RIGHT — Contact ───────────────────────── */}
      <section className="px-12 py-16 md:px-16">
        <p className="eyebrow mb-5">CONTACT</p>
        <h2 className="serif mb-8 text-4xl font-light leading-tight">
          Start a<br /><em className="text-[var(--gold)]">conversation</em>
        </h2>

        <div className="space-y-4">
          {[
            { label:"NAME",         key:"name",        placeholder:"Your full name" },
            { label:"EMAIL",        key:"email",        placeholder:"your@email.com" },
            { label:"PROJECT TYPE", key:"projectType",  placeholder:"Residential / Commercial…" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="mono mb-1 block text-[9px] tracking-[.12em] text-[var(--faint)]">{label}</label>
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)] placeholder:text-[#333] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="mono mb-1 block text-[9px] tracking-[.12em] text-[var(--faint)]">MESSAGE</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project…"
              className="w-full resize-none border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)] placeholder:text-[#333] focus:border-[var(--gold)] focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="mono w-full border border-[var(--gold)] py-3 text-[10px] tracking-[.12em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--bg)] disabled:opacity-50"
          >
            {status === "loading" ? "SENDING…" : "SEND MESSAGE →"}
          </button>

          {status === "ok"    && <p className="mono text-[9px] tracking-widest text-[var(--gold)]">MESSAGE SENT ✓</p>}
          {status === "error" && <p className="mono text-[9px] tracking-widest text-red-500">SOMETHING WENT WRONG — TRY AGAIN</p>}
        </div>

        <div className="mono mt-10 space-y-1 text-[9px] tracking-[.06em] text-[#333]">
          <p>m.abdelazeem@gmai.com</p>
          <p>+201006431110</p>
          <p>New Cairo, Egypt</p>
        </div>
      </section>
    </main>
  );
}

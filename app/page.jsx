import Link from "next/link";
import { getProjects } from "../lib/api";

export const revalidate = 60;

export default async function HomePage() {
  let featured = null;
  try {
    const { data } = await getProjects();
    featured = data.find((p) => p.featured) || data[0] || null;
  } catch {}

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative flex h-screen min-h-[640px] flex-col justify-center overflow-hidden px-12 md:px-20"
        style={{ background: "linear-gradient(135deg, #0A0A0A 60%, #141410 100%)" }}>

        {/* subtle gold grid lines */}
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(201,169,110,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}/>

        <p className="eyebrow mb-6">Cairo · Egypt — Est. 2015</p>

        <h1 className="serif text-7xl font-light leading-none tracking-tight md:text-8xl">
          Mohamed<br />
          <em className="not-italic" style={{ color: "#C9A96E" }}>Abd El Azeem</em>
        </h1>

        <p className="serif mt-4 tracking-widest" style={{ fontSize: "1.25rem", color: "#888", fontWeight: 300 }}>
          Architect &amp; Urban Designer
        </p>

        <div className="gold-line my-10" />

        <div className="flex gap-12">
          {[["24","PROJECTS"],["09","YEARS"],["06","COUNTRIES"],["13","AWARDS"]].map(([n, l]) => (
            <div key={l}>
              <span className="serif block text-4xl font-light">{n}</span>
              <span className="mono mt-1 block text-[10px] tracking-[.15em]" style={{ color: "#444" }}>{l}</span>
            </div>
          ))}
        </div>

        <Link href="/gallery"
          className="mono mt-12 inline-flex w-fit items-center gap-3 border px-7 py-3 text-[11px] tracking-[.12em] transition hover:opacity-80"
          style={{ borderColor: "#C9A96E", color: "#C9A96E" }}>
          VIEW WORK →
        </Link>
      </section>

      {/* ── FEATURED STRIP ───────────────────────────── */}
      {featured && (
        <div className="flex items-center gap-6 border-t px-12 py-5 md:px-20"
          style={{ background: "#141414", borderColor: "#1E1E1E" }}>
          <span className="mono text-[9px] tracking-[.15em]" style={{ color: "#444" }}>FEATURED PROJECT</span>
          <span className="serif text-lg" style={{ color: "#888" }}>
            <span style={{ color: "#C9A96E" }}>{featured.title}</span>
            {" "}— {featured.category}, {featured.location} {featured.year}
          </span>
          <Link href={`/gallery/${featured.slug || featured._id}`}
            className="mono ml-auto text-[9px] transition hover:opacity-80"
            style={{ color: "#C9A96E" }}>→</Link>
        </div>
      )}
    </main>
  );
}

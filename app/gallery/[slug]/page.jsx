"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProject } from "../../../lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function ProjectPage() {
  const { slug }           = useParams();
  const router             = useRouter();
  const [project, setProject] = useState(null);
  const [lightbox, setLightbox] = useState(null); // index of active image

  useEffect(() => {
    getProject(slug)
      .then(({ data }) => setProject(data))
      .catch(() => router.replace("/not-found"));
  }, [slug]);

  // close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="mono text-[10px] tracking-[.2em] text-[#444]">LOADING…</p>
      </main>
    );
  }

  const images = project.images || [];

  return (
    <main className="min-h-screen pb-24">
      {/* ── Hero image ──────────────────────────── */}
      <div className="relative h-[55vh] overflow-hidden">
        {images[0]?.url ? (
          <Image
            src={images[0].url}
            alt={project.title}
            fill
            priority
            className="object-cover brightness-75 saturate-50"
          />
        ) : (
          <div className="h-full w-full bg-[#141414]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* ── Header ──────────────────────────────── */}
      <div className="px-12 pt-10 md:px-20">
        <Link href="/gallery" className="mono mb-8 inline-block text-[9px] tracking-[.15em] text-[#444] hover:text-[#C9A96E] transition">
          ← ALL WORKS
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mono mb-3 text-[9px] tracking-[.2em] text-[#C9A96E]">
              {project.category?.toUpperCase()} · {project.year}
            </p>
            <h1 className="serif text-5xl font-light leading-tight md:text-6xl">
              {project.title}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-3">
            {[
              ["LOCATION", project.location],
              ["YEAR",     project.year],
              ["AREA",     project.area ? `${project.area.toLocaleString()} m²` : "—"],
              ["CATEGORY", project.category],
            ].map(([l, v]) => (
              <div key={l}>
                <span className="mono block text-[9px] tracking-[.1em] text-[#444]">{l}</span>
                <span className="serif text-base text-[#F0EDE8]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* gold divider */}
        <div className="my-10 h-px w-12 bg-[#C9A96E]" />

        {/* Description */}
        {project.description && (
          <p className="mb-16 max-w-2xl text-sm leading-relaxed text-[#888]">
            {project.description}
          </p>
        )}
      </div>

      {/* ── Image Grid ──────────────────────────── */}
      {images.length > 0 && (
        <div className="px-12 md:px-20">
          <p className="mono mb-6 text-[9px] tracking-[.15em] text-[#444]">PROJECT IMAGES</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative block overflow-hidden focus:outline-none"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.caption || `${project.title} — image ${i + 1}`}
                    fill
                    className="object-cover brightness-75 saturate-50 transition duration-500 group-hover:scale-105 group-hover:brightness-90"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Lightbox ────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4"
          onClick={() => setLightbox(null)}
        >
          {/* close */}
          <button
            className="mono absolute top-6 right-8 text-[10px] tracking-[.15em] text-[#888] hover:text-[#F0EDE8]"
            onClick={() => setLightbox(null)}
          >
            CLOSE ✕
          </button>

          {/* prev */}
          {lightbox > 0 && (
            <button
              className="mono absolute left-6 text-[10px] tracking-[.15em] text-[#888] hover:text-[#C9A96E] transition"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
            >
              ← PREV
            </button>
          )}

          {/* image */}
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightbox].url}
              alt={images[lightbox].caption || project.title}
              fill
              className="object-contain"
            />
          </div>

          {/* next */}
          {lightbox < images.length - 1 && (
            <button
              className="mono absolute right-6 text-[10px] tracking-[.15em] text-[#888] hover:text-[#C9A96E] transition"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
            >
              NEXT →
            </button>
          )}

          {/* counter */}
          <p className="mono absolute bottom-6 text-[9px] tracking-[.15em] text-[#444]">
            {lightbox + 1} / {images.length}
          </p>
        </div>
      )}
    </main>
  );
}

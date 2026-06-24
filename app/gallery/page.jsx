"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "../../lib/api";

const CATEGORIES = ["ALL", "Residential", "Commercial", "Cultural", "Other"];

export default function GalleryPage() {
  const [projects, setProjects] = useState([]);
  const [active, setActive]     = useState("ALL");
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const cat = active === "ALL" ? undefined : active;
        const { data } = await getProjects(cat);
        setProjects(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [active]);

  return (
    <main className="min-h-screen px-12 pt-28 pb-16 md:px-20">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="serif text-4xl font-light">
          Works <em className="italic text-[#888]">({projects.length})</em>
        </h1>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`mono border px-3 py-1 text-[9px] tracking-[.08em] transition
                ${active === cat
                  ? "border-[#C9A96E] text-[#C9A96E]"
                  : "border-[#1E1E1E] text-[#444] hover:border-[#888]"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mono text-[10px] tracking-widest text-[#444]">LOADING...</p>
      ) : (
        <div className="grid grid-cols-1 gap-px bg-[#1E1E1E] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Link key={project._id} href={`/gallery/${project.slug || project._id}`}
              className={`group bg-[#0A0A0A] ${i === 0 ? "sm:col-span-2" : ""}`}>
              <div className={`relative overflow-hidden ${i === 0 ? "h-72" : "h-52"}`}>
                {project.images?.[0]?.url ? (
                  <Image
                    src={project.images[0].url}
                    alt={project.title}
                    fill
                    className="object-cover brightness-75 saturate-50 transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[#141414]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                <span className="mono absolute bottom-3 left-4 text-[9px] tracking-[.1em] text-[#C9A96E]">
                  {project.category?.toUpperCase()} · {project.year}
                </span>
                {project.featured && (
                  <span className="mono absolute top-3 right-3 bg-[#C9A96E] px-2 py-1 text-[8px] tracking-[.1em] text-[#0A0A0A]">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="px-4 py-3">
                <h2 className="serif text-lg">{project.title}</h2>
                <p className="mono mt-1 text-[9px] tracking-[.05em] text-[#444]">
                  {project.location}{project.area ? ` · ${project.area.toLocaleString()} m²` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

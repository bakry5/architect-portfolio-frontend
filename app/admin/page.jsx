"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  getAdminProjects,
  createProject,
  deleteProject,
  updateProject,
  toggleFeatured,
} from "../../lib/api";

const EMPTY = {
  title: "", location: "", category: "Commercial",
  year: new Date().getFullYear(), area: "", description: "", status: "draft",
};

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [form, setForm]         = useState(EMPTY);
  const [files, setFiles]       = useState([]);
  const [saving, setSaving]     = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!loading && !isAdmin) router.replace("/admin/login");
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) loadProjects();
  }, [isAdmin]);

  const loadProjects = async () => {
    const { data } = await getAdminProjects();
    setProjects(data);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("images", f));
      await createProject(fd);
      setForm(EMPTY);
      setFiles([]);
      await loadProjects();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    await loadProjects();
  };

  const handleToggleStatus = async (project) => {
    const newStatus = project.status === "published" ? "draft" : "published";
    await updateProject(project._id, { status: newStatus });
    await loadProjects();
  };

  const handleToggleFeatured = async (project) => {
    await toggleFeatured(project._id);
    await loadProjects();
  };

  if (loading || !isAdmin) return null;

  return (
    <main className="min-h-screen px-12 py-12 md:px-20">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="serif text-3xl font-light">Admin Panel</h1>
        <span className="mono border border-[#1E1E1E] px-3 py-1 text-[9px] tracking-[.12em] text-[#C9A96E]">
          ● AUTHENTICATED
        </span>
      </div>

      {/* Upload zone */}
      <div onClick={() => fileRef.current.click()}
        className="mb-6 cursor-pointer border border-dashed border-[#222] py-8 text-center transition hover:border-[#C9A96E]/40">
        <p className="text-sm text-[#444]">Drag & drop project images here</p>
        <p className="mono mt-1 text-[9px] tracking-[.05em] text-[#2A2A2A]">
          PNG · JPG · WEBP · Max 20MB — Uploaded to Cloudinary
        </p>
        {files.length > 0 && (
          <p className="mono mt-2 text-[9px] tracking-widest text-[#C9A96E]">{files.length} FILE(S) SELECTED</p>
        )}
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
          onChange={(e) => setFiles([...e.target.files])} />
      </div>

      {/* Form */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        {[["PROJECT NAME","title"],["LOCATION","location"]].map(([lbl,key]) => (
          <div key={key}>
            <label className="mono mb-1 block text-[9px] tracking-[.1em] text-[#444]">{lbl}</label>
            <input value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})}
              className="w-full border border-[#1E1E1E] bg-[#141414] px-3 py-2 text-sm text-[#888] focus:border-[#C9A96E] focus:outline-none"/>
          </div>
        ))}
      </div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <label className="mono mb-1 block text-[9px] tracking-[.1em] text-[#444]">CATEGORY</label>
          <select value={form.category} onChange={e => setForm({...form,category:e.target.value})}
            className="w-full border border-[#1E1E1E] bg-[#141414] px-3 py-2 text-sm text-[#C9A96E] focus:border-[#C9A96E] focus:outline-none">
            {["Residential","Commercial","Cultural","Other"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="mono mb-1 block text-[9px] tracking-[.1em] text-[#444]">YEAR</label>
          <input type="number" value={form.year} onChange={e => setForm({...form,year:e.target.value})}
            className="w-full border border-[#1E1E1E] bg-[#141414] px-3 py-2 text-sm text-[#888] focus:border-[#C9A96E] focus:outline-none"/>
        </div>
        <div>
          <label className="mono mb-1 block text-[9px] tracking-[.1em] text-[#444]">AREA (m²)</label>
          <input type="number" value={form.area} onChange={e => setForm({...form,area:e.target.value})}
            className="w-full border border-[#1E1E1E] bg-[#141414] px-3 py-2 text-sm text-[#888] focus:border-[#C9A96E] focus:outline-none"/>
        </div>
      </div>
      <div className="mb-4">
        <label className="mono mb-1 block text-[9px] tracking-[.1em] text-[#444]">DESCRIPTION</label>
        <textarea rows={3} value={form.description} onChange={e => setForm({...form,description:e.target.value})}
          className="w-full resize-none border border-[#1E1E1E] bg-[#141414] px-3 py-2 text-sm text-[#888] focus:border-[#C9A96E] focus:outline-none"/>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <label className="mono flex cursor-pointer items-center gap-2 text-[9px] tracking-[.1em] text-[#444]">
          <input type="checkbox" checked={form.status==="published"}
            onChange={e => setForm({...form,status:e.target.checked?"published":"draft"})}
            className="accent-[#C9A96E]"/>
          PUBLISH IMMEDIATELY
        </label>
        <button onClick={handleSubmit} disabled={saving}
          className="mono bg-[#C9A96E] px-6 py-2 text-[10px] tracking-[.1em] text-[#0A0A0A] hover:opacity-90 disabled:opacity-50">
          {saving ? "SAVING…" : "PUBLISH PROJECT →"}
        </button>
      </div>

      {/* Table */}
      <p className="mono mb-4 text-[9px] tracking-[.2em] text-[#C9A96E]">PROJECTS</p>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {["PROJECT","CATEGORY","YEAR","STATUS","FEATURED",""].map(h => (
              <th key={h} className="mono border-b border-[#1A1A1A] pb-2 text-left text-[9px] tracking-[.1em] text-[#444]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id} className="border-b border-[#111]">
              <td className="serif py-2 text-base">{p.title}</td>
              <td className="mono text-[9px] tracking-[.05em] text-[#444]">{p.category?.toUpperCase()}</td>
              <td className="mono text-[9px] text-[#444]">{p.year}</td>
              <td>
                <button onClick={() => handleToggleStatus(p)}
                  className={`mono text-[9px] tracking-widest ${p.status==="published"?"text-[#C9A96E]":"text-[#444]"}`}>
                  {p.status === "published" ? "● LIVE" : "○ DRAFT"}
                </button>
              </td>
              <td>
                <button onClick={() => handleToggleFeatured(p)}
                  className={`mono text-[9px] tracking-widest transition ${p.featured ? "text-[#C9A96E]" : "text-[#2A2A2A] hover:text-[#888]"}`}>
                  {p.featured ? "★ YES" : "☆ SET"}
                </button>
              </td>
              <td className="mono text-[9px] tracking-[.04em]">
                <button onClick={() => handleDelete(p._id)}
                  className="text-[#333] transition hover:text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

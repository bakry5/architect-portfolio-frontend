"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { href: "/",        label: "Home"    },
  { href: "/gallery", label: "Works"   },
  { href: "/about",   label: "Contact" },
];

export default function Navbar() {
  const pathname       = usePathname();
  const { isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // hide navbar on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 md:px-14"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,10,.9), transparent)" }}>

      {/* Logo */}
      <Link href="/" className="serif text-xl font-light tracking-tight text-[#F0EDE8]">
        M. <em className="text-[#C9A96E]">Abd El Azeem</em>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`mono text-[10px] tracking-[.15em] transition
              ${pathname === href ? "text-[#C9A96E]" : "text-[#888] hover:text-[#F0EDE8]"}`}
          >
            {label.toUpperCase()}
          </Link>
        ))}
        {isAdmin && (
          <>
            <Link href="/admin"
              className="mono text-[10px] tracking-[.15em] text-[#888] hover:text-[#C9A96E] transition">
              ADMIN
            </Link>
            <button onClick={logout}
              className="mono text-[10px] tracking-[.15em] text-[#444] hover:text-red-400 transition">
              LOGOUT
            </button>
          </>
        )}
      </nav>

      {/* Mobile hamburger */}
      <button className="md:hidden text-[#888]" onClick={() => setOpen(!open)}>
        <span className="mono text-[10px] tracking-[.15em]">{open ? "CLOSE" : "MENU"}</span>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col gap-6 bg-[#0A0A0A] px-8 py-8 md:hidden border-t border-[#1E1E1E]">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="mono text-[11px] tracking-[.15em] text-[#888] hover:text-[#F0EDE8] transition">
              {label.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

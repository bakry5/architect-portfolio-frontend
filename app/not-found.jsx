import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <p className="mono mb-6 text-[10px] tracking-[.2em] text-[#C9A96E]">404</p>
      <h1 className="serif mb-4 text-6xl font-light leading-none">
        Page not<br /><em className="text-[#C9A96E]">found</em>
      </h1>
      <p className="mono mb-10 text-[11px] tracking-[.1em] text-[#444]">
        THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST
      </p>
      <div className="mono h-px w-12 bg-[#C9A96E] mb-10" />
      <Link href="/"
        className="mono border border-[#C9A96E] px-7 py-3 text-[10px] tracking-[.12em] text-[#C9A96E] transition hover:bg-[#C9A96E] hover:text-[#0A0A0A]">
        GO HOME →
      </Link>
    </main>
  );
}

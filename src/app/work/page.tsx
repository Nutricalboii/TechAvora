import Link from 'next/link';

export default function WorkPage() {
  return (
    <div className="min-h-[70vh] bg-white/80 pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#9a6d08]">
          Tech Avora / Project Experience
        </p>
        <h1 className="mb-6 font-heading text-4xl uppercase leading-tight tracking-wide text-slate-900 sm:text-6xl">
          Case studies are under review.
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-700">
          Tech Avora is reviewing project outcome details and publication permissions before sharing
          client case studies. Explore the service methodologies while that review is underway.
        </p>
        <Link
          href="/services"
          className="inline-flex min-h-11 items-center rounded-full bg-[#B8860B] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#a07508]"
        >
          Explore services
        </Link>
      </div>
    </div>
  );
}

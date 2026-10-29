"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { company } from "@/lib/site";
import { BUILD_POSTERS, BUILD_SHEETS } from "@/lib/premium-media";

const COLS = 8;
const ROWS = 5;
const FRAME_COUNT = 40;

function stageLabel(p: number) {
  if (p < 0.18) return "01  Graded lot";
  if (p < 0.4) return "02  Foundation";
  if (p < 0.62) return "03  Framing";
  if (p < 0.84) return "04  Envelope";
  return "05  Complete";
}

function spritePos(index: number) {
  const i = Math.min(FRAME_COUNT - 1, Math.max(0, index));
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MansionBuildHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const phoneSprite = useRef<HTMLDivElement>(null);
  const deskSprite = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lastIdx = useRef(0);
  const shown = useRef(0);
  const [label, setLabel] = useState(stageLabel(0));
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const reduced = reducedMotion();
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    const target = isPhone ? phoneSprite.current : deskSprite.current;
    let loaded = false;

    const loadSheet = () => {
      if (loaded) return;
      loaded = true;
      const load = isPhone ? BUILD_SHEETS.mobile() : BUILD_SHEETS.desktop();
      void load.then((mod) => {
        if (target) target.style.backgroundImage = `url(${mod.default})`;
      });
    };

    function paint(index: number) {
      const pos = spritePos(index);
      if (phoneSprite.current) phoneSprite.current.style.backgroundPosition = pos;
      if (deskSprite.current) deskSprite.current.style.backgroundPosition = pos;
    }

    function apply(p: number) {
      const idx = reduced
        ? FRAME_COUNT - 1
        : Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
      if (lastIdx.current !== idx) {
        lastIdx.current = idx;
        paint(idx);
      }
      const next = stageLabel(p);
      setLabel((cur) => (cur === next ? cur : next));
      setHint((h) => {
        const show = p < 0.05 && !reduced;
        return h === show ? h : show;
      });
      if (barRef.current) barRef.current.style.width = `${Math.round(p * 100)}%`;
    }

    paint(reduced ? FRAME_COUNT - 1 : 0);
    if (reduced) {
      loadSheet();
      apply(1);
      return;
    }

    let raf = 0;
    let running = true;

    function measure() {
      raf = 0;
      const el = wrapRef.current;
      if (!el || !running) return;
      const travel = el.offsetHeight - window.innerHeight;
      const next = travel <= 0 ? 0 : Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel));
      shown.current += (next - shown.current) * 0.22;
      if (Math.abs(next - shown.current) < 0.001) shown.current = next;
      apply(shown.current);
      if (Math.abs(next - shown.current) >= 0.001) raf = requestAnimationFrame(measure);
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(measure);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadSheet();
      },
      { rootMargin: "280px 0px" },
    );
    if (wrapRef.current) io.observe(wrapRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();
    return () => {
      running = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const sheet = {
    backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: spritePos(0),
  };

  return (
    <section ref={wrapRef} className="relative h-[180vh] bg-ink">
      <div className="sticky top-0 h-dvh overflow-hidden text-bone">
        <img
          src={BUILD_POSTERS.mobile}
          alt=""
          width={390}
          height={844}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover md:hidden"
        />
        <div ref={phoneSprite} className="absolute inset-0 md:hidden" style={sheet} aria-hidden />

        <img
          src={BUILD_POSTERS.desktop}
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 hidden size-full object-cover md:block"
        />
        <div ref={deskSprite} className="absolute inset-0 hidden md:block" style={sheet} aria-hidden />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink via-ink/80 to-transparent pt-24 md:inset-0 md:bg-gradient-to-r md:from-ink md:via-ink/55 md:to-transparent md:pt-0">
          <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pb-16 md:h-full md:justify-center md:pt-24 md:pb-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">{label}</p>
            <h1 className="mt-2 max-w-xl font-display text-[2rem] leading-tight font-medium text-bone md:mt-4 md:max-w-2xl md:text-6xl lg:text-7xl">
              Scroll. The house goes up.
            </h1>
            <p className="mt-3 max-w-md text-sm text-bone/80 md:mt-5 md:max-w-lg md:text-lg">
              Lot to lights-on — the same sequence we run on ADUs, additions, and remodels.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
              <Link
                to="/quote"
                className="inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg transition-transform duration-150 active:scale-[0.96]"
              >
                Book a site visit
              </Link>
              <a
                href={company.phoneHref}
                className="inline-flex min-h-12 items-center rounded-md border border-bone/30 px-5 font-semibold text-bone"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = company.phoneHref;
                }}
              >
                Call {company.phone}
              </a>
            </div>
            {hint ? (
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-bone/60 md:mt-10">
                Scroll to raise the house
              </p>
            ) : null}
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 z-20 h-1 bg-ink/40">
          <div ref={barRef} className="h-full w-0 bg-copper" />
        </div>
      </div>
    </section>
  );
}

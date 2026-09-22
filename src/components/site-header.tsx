"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { company, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bone/90 backdrop-blur-md">
      <div className="hidden border-b border-ink bg-ink text-bone md:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-5 text-[11px] font-medium uppercase tracking-[0.14em]">
          <span>North Hills · San Fernando Valley · Los Angeles</span>
          <span className="flex gap-6">
            <a
              href={company.phoneHref}
              className="hover:text-copper"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = company.phoneHref;
              }}
            >
              {company.phone}
            </a>
            <span>{company.license}</span>
          </span>
        </div>
      </div>
      <div className="mx-auto flex h-[5.25rem] max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Home">
          <BrandLogo className="h-14 md:h-16" height={64} />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium text-muted transition-colors duration-150 hover:text-ink",
                pathname === item.href && "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={company.phoneHref}
            className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-cream text-ink lg:hidden"
            aria-label={`Call ${company.phone}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = company.phoneHref;
            }}
          >
            <Phone className="size-4" />
          </a>
          <Link
            to="/quote"
            className="hidden min-h-11 items-center rounded-md bg-cta px-4 text-sm font-semibold text-cta-fg transition-opacity duration-150 hover:opacity-90 md:inline-flex"
          >
            Book a visit
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-line px-3 py-1 lg:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 text-sm font-medium",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-ink text-bone"
                : "text-ink",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {open ? (
        <div className="border-t border-line bg-bone px-5 py-4 lg:hidden">
          <div className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-base font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-cta font-semibold text-cta-fg"
            >
              Book a visit
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

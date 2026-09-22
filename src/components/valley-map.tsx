"use client";

import { useState } from "react";
import { areas } from "@/lib/site";

const OSM =
  "https://www.openstreetmap.org/export/embed.html?bbox=-118.65%2C34.13%2C-118.28%2C34.34&layer=mapnik&marker=34.2356%2C-118.4847";

export function ValleyMap() {
  const [active, setActive] = useState("North Hills");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="overflow-hidden rounded-xl border border-line bg-ink">
        <svg
          viewBox="0 0 100 84"
          className="h-auto w-full"
          role="img"
          aria-label="San Fernando Valley service map"
        >
          <rect width="100" height="84" fill="#0E1210" />
          <path
            d="M6 18 C18 8, 38 6, 52 10 C68 14, 86 16, 96 28 L94 74 C78 80, 54 78, 36 72 C20 68, 8 58, 6 40 Z"
            fill="#1A211C"
            stroke="#B87333"
            strokeWidth="0.35"
          />
          <path
            d="M10 50 C28 46, 48 48, 70 42"
            fill="none"
            stroke="#3D4A42"
            strokeWidth="0.5"
          />
          <text
            x="50"
            y="8"
            textAnchor="middle"
            fill="#E7DFD2"
            fontSize="3.2"
            letterSpacing="0.4"
          >
            SAN FERNANDO VALLEY
          </text>
          {areas.map((a) => {
            const on = active === a.name;
            return (
              <g
                key={a.name}
                className="cursor-pointer"
                onMouseEnter={() => setActive(a.name)}
                onFocus={() => setActive(a.name)}
                tabIndex={0}
              >
                <circle
                  cx={a.x}
                  cy={a.y}
                  r={a.home ? 2.4 : on ? 1.8 : 1.35}
                  fill={a.home || on ? "#B87333" : "#F3EEE6"}
                />
                <text
                  x={a.x}
                  y={a.y - 3.2}
                  textAnchor="middle"
                  fill={a.home || on ? "#B87333" : "#E7DFD2"}
                  fontSize={a.home ? 2.6 : 2.2}
                  fontWeight={a.home ? 600 : 500}
                >
                  {a.name}
                </text>
              </g>
            );
          })}
        </svg>
        <iframe
          title="OpenStreetMap of North Hills and the San Fernando Valley"
          src={OSM}
          className="h-[280px] w-full border-t border-bone/10 md:h-[320px]"
          loading="lazy"
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          {active === "North Hills" ? "Home base" : "In service"}
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium">{active}</h2>
        <p className="mt-3 text-sm text-muted">
          Shop address stays private. Work is on-site across the Valley — ADUs,
          remodels, and plumbing-connected construction.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-2">
          {areas.map((a) => (
            <li key={a.name}>
              <button
                type="button"
                onClick={() => setActive(a.name)}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm font-medium ${
                  active === a.name
                    ? "border-ink bg-ink text-bone"
                    : "border-line bg-cream text-ink"
                }`}
              >
                {a.name}
                {a.home ? " · base" : ""}
              </button>
            </li>
          ))}
        </ul>
        <a
          href="https://www.openstreetmap.org/?mlat=34.2356&mlon=-118.4847#map=12/34.2356/-118.4847"
          className="mt-6 inline-block text-sm font-medium text-ink underline"
          target="_blank"
          rel="noreferrer"
        >
          Open the Valley map
        </a>
      </div>
    </div>
  );
}

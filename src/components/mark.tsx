import { cn } from "@/lib/utils";

export function Mark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect
        width="40"
        height="40"
        rx="8"
        className={inverted ? "fill-bone" : "fill-ink"}
      />
      <path
        d="M8 20h24"
        className={inverted ? "stroke-copper" : "stroke-copper"}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle
        cx="20"
        cy="20"
        r="5.4"
        className={inverted ? "stroke-ink" : "stroke-bone"}
        strokeWidth="1.8"
      />
      <path
        d="M20 11.4V14M20 26v2.6"
        className={inverted ? "stroke-ink" : "stroke-bone"}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <span className="flex items-center gap-3">
      <Mark className="size-9 shrink-0" inverted={inverted} />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-lg font-medium tracking-tight",
            inverted ? "text-bone" : "text-ink",
          )}
        >
          My Plumbing Inc
        </span>
        {compact ? null : (
          <span
            className={cn(
              "block text-[11px] font-medium uppercase tracking-[0.16em]",
              inverted ? "text-bone/55" : "text-muted",
            )}
          >
            B Contractor · CSLB 1120118
          </span>
        )}
      </span>
    </span>
  );
}

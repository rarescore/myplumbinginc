import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  height = 56,
  lazy = false,
}: {
  className?: string;
  height?: number;
  lazy?: boolean;
}) {
  return (
    <img
      src="/photos/logo.webp"
      width={Math.round((height * 326) / 220)}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      alt="My Plumbing Inc"
      height={height}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height }}
    />
  );
}

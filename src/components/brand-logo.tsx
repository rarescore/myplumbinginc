import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  height = 56,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <img
      src="/photos/logo.png"
      alt="My Plumbing Inc"
      height={height}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height }}
    />
  );
}

import { Link } from "@tanstack/react-router";
import { CallLink } from "@/components/call-link";

export function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-bone md:hidden">
      <CallLink className="inline-flex min-h-14 items-center justify-center bg-ink font-semibold text-bone">
        Call
      </CallLink>
      <Link
        to="/quote"
        className="inline-flex min-h-14 items-center justify-center bg-cta font-semibold text-cta-fg"
      >
        Book a visit
      </Link>
    </div>
  );
}

import type { ReactNode } from "react";
import { company } from "@/lib/site";

type Props = {
  className?: string;
  children?: ReactNode;
};

export function CallLink({ className, children }: Props) {
  return (
    <a
      href={company.phoneHref}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = company.phoneHref;
      }}
    >
      {children ?? `Call ${company.phone}`}
    </a>
  );
}

import type { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export function SectionTitle({ eyebrow, title, children }: SectionTitleProps) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

import React from "react";
import type { ParagraphProps } from "@/types/Typography";
import clsx from "clsx";

export default function Paragraph({
  as = "p",
  children,
  ...props
}: ParagraphProps) {
  const Component: React.ElementType = (
    typeof as === "string" ? as : `p`
  ) as React.ElementType;

  return (
    <Component
      {...props}
      className={clsx("font-roboto text-base sm:text-lg", props.className)}
    >
      {children}
    </Component>
  );
}

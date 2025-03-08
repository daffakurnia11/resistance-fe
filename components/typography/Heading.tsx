import React from "react";
import type { HeadingProps } from "@/types/Typography";
import clsx from "clsx";

export default function Heading({
  as = "h1",
  level = 1,
  children,
  ...props
}: HeadingProps) {
  const sizeLevel = {
    1: "text-3xl sm:text-4xl",
    2: "text-2xl sm:text-3xl",
    3: "text-xl sm:text-2xl",
    4: "text-lg sm:text-xl",
    5: "text-base sm:text-lg",
  };

  const sizeClass = sizeLevel[level];

  const Component: React.ElementType = (
    typeof as === "string" ? as : `h${level}`
  ) as React.ElementType;

  return (
    <Component
      {...props}
      className={clsx("font-roboto", sizeClass, props.className)}
    >
      {children}
    </Component>
  );
}

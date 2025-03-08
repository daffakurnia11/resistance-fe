import React from "react";
import type { SmallProps } from "@/types/Typography";
import clsx from "clsx";

export default function Small({
  as = "small",
  children,
  ...props
}: SmallProps) {
  const Component: React.ElementType = (
    typeof as === "string" ? as : `small`
  ) as React.ElementType;

  return (
    <Component
      {...props}
      className={clsx("font-roboto text-sm sm:text-base", props.className)}
    >
      {children}
    </Component>
  );
}

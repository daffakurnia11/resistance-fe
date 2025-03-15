import React from "react";
import type { ParagraphProps } from "@/types/Typography";
import clsx from "clsx";
import Loading from "../loading";

export default function Paragraph({
  as = "p",
  children,
  loadingClassName,
  isLoading,
  ...props
}: ParagraphProps) {
  const Component: React.ElementType = (
    typeof as === "string" ? as : `p`
  ) as React.ElementType;

  return isLoading ? (
    <Loading
      className={clsx("w-full h-[22px]", loadingClassName)}
      isLoading={isLoading}
    />
  ) : (
    <Component
      {...props}
      className={clsx("font-roboto text-base sm:text-lg", props.className)}
    >
      {children}
    </Component>
  );
}

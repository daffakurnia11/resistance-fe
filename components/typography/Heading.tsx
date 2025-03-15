import React from "react";
import type { HeadingProps } from "@/types/Typography";
import clsx from "clsx";
import Loading from "../loading";

export default function Heading({
  as = "h1",
  level = 1,
  children,
  loadingClassName,
  isLoading,
  ...props
}: HeadingProps) {
  const sizeLevel = {
    1: "text-3xl sm:text-4xl",
    2: "text-2xl sm:text-3xl",
    3: "text-xl sm:text-2xl",
    4: "text-lg sm:text-xl",
    5: "text-base sm:text-lg",
  };

  const loadingSize = {
    1: "w-full h-[40px]",
    2: "w-full h-[32px]",
    3: "w-full h-[28px]",
    4: "w-full h-[24px]",
    5: "w-full h-[22px]",
  };

  const sizeClass = sizeLevel[level];

  const loadingClass = loadingSize[level];

  const Component: React.ElementType = (
    typeof as === "string" ? as : `h${level}`
  ) as React.ElementType;

  return isLoading ? (
    <Loading
      className={clsx(loadingClass, loadingClassName)}
      isLoading={isLoading}
    />
  ) : (
    <Component
      {...props}
      className={clsx("font-roboto", sizeClass, props.className)}
    >
      {children}
    </Component>
  );
}

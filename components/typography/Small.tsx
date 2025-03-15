import React from "react";
import type { SmallProps } from "@/types/Typography";
import clsx from "clsx";
import Loading from "../loading";

export default function Small({
  as = "small",
  children,
  loadingClassName,
  isLoading,
  ...props
}: SmallProps) {
  const Component: React.ElementType = (
    typeof as === "string" ? as : `small`
  ) as React.ElementType;

  return isLoading ? (
    <Loading
      className={clsx("w-full h-[16px]", loadingClassName)}
      isLoading={isLoading}
    />
  ) : (
    <Component
      {...props}
      className={clsx("font-roboto text-sm sm:text-base", props.className)}
    >
      {children}
    </Component>
  );
}

import clsx from "clsx";
import React from "react";

type Props = {
  isLoading: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Loading({ isLoading, className, style }: Props) {
  return (
    <div
      className={clsx(
        "block bg-green-dark animate-pulse mx-auto",
        className,
        isLoading ? "" : "hidden"
      )}
      style={style}
    ></div>
  );
}

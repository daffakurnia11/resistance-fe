import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import Typography from "../typography";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonSecondary({
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "bg-black border border-solid border-green-primary py-2 px-5 rounded-2xl flex items-center justify-center enabled:hover:bg-green-secondary group transition duration-300 text-base disabled:opacity-30 disabled:cursor-not-allowed",
        className
      )}
    >
      <Typography.Paragraph as={"span"} className="group-hover:text-green-dark">
        {children}
      </Typography.Paragraph>
    </button>
  );
}

import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import Typography from "../typography";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimary({
  children,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "bg-green-dark border border-solid border-green-primary py-2 px-5 rounded-2xl flex items-center justify-center enabled:hover:bg-green-secondary group transition duration-300 text-base disabled:opacity-30 disabled:cursor-not-allowed",
        className
      )}
    >
      <Typography.Paragraph
        as={"span"}
        className="group-enabled:group-hover:text-green-dark"
      >
        {children}
      </Typography.Paragraph>
    </button>
  );
}

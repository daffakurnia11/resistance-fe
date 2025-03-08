import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import Typography from "../typography";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimary({
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "bg-green-dark border border-solid border-green-primary py-2 px-5 rounded-2xl flex items-center justify-center hover:bg-green-secondary group transition duration-300 text-base",
        className
      )}
    >
      <Typography.Paragraph as={"span"} className="group-hover:text-green-dark">
        {children}
      </Typography.Paragraph>
    </button>
  );
}

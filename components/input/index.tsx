import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type InputTextProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputTextProps) {
  return (
    <input
      {...props}
      className={clsx(
        "bg-black border border-solid border-green-primary py-3 px-4 rounded-2xl text-base text-green-secondary placeholder:text-green-primary outline-none transition-all duration-300 focus:border-green-secondary disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    />
  );
}

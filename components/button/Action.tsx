import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import Typography from "../typography";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionType?: "success" | "danger";
}

export default function ButtonAction({
  children,
  className,
  disabled,
  actionType,
  ...props
}: Props) {
  const actionTypeClass =
    actionType === "success"
      ? "bg-action-green/50 enabled:hover:bg-action-green"
      : "bg-action-red/50 enabled:hover:bg-action-red";

  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "border border-solid border-green-primary py-2 px-5 rounded-2xl flex items-center justify-center group transition duration-300 text-base disabled:opacity-30 disabled:cursor-not-allowed",
        className,
        actionTypeClass
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

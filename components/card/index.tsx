import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({ className, children, onClick }: Props) {
  return (
    <div className={className} onClick={onClick}>
      <div
        className={clsx(
          "p-[1px] w-full h-full bg-gradient-to-b from-green-primary from-30% to-green-primary/15 hover:bg-green-primary to-80% rounded-[18px] transition-all duration-300"
        )}
      >
        <div
          className={clsx("w-full h-full bg-black rounded-[17px] p-4 relative")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

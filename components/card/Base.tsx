import { motion } from "framer-motion";
import clsx from "clsx";
import React from "react";
import { useHover } from "@/hooks/use-hover";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  action?: React.ReactNode;
  className?: string;
  outerClassName?: string;
  innerClassName?: string;
  onClick?: () => void;
};

export default function CardBase({
  className,
  outerClassName,
  innerClassName,
  children,
  action,
  onClick,
  style,
}: Props) {
  const {
    handleMouseDownControls,
    handleMouseEnterControls,
    handleMouseLeaveControls,
    handleMouseUpControls,
    isHover,
  } = useHover();

  const actionVariant = {
    hover: {
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    initial: {
      y: -100,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnterControls}
      onMouseDown={handleMouseDownControls}
      onMouseLeave={handleMouseLeaveControls}
      onMouseUp={handleMouseUpControls}
    >
      <div
        className={clsx(
          "p-[1px] w-full h-full bg-gradient-to-b from-green-primary from-30% to-green-primary/15 hover:bg-green-primary to-80% rounded-[18px] transition-all duration-300",
          outerClassName
        )}
      >
        <div
          className={clsx(
            "w-full h-full bg-black transition-all duration-300 rounded-[17px] p-4 relative overflow-hidden",
            innerClassName
          )}
        >
          {children}
          <motion.div
            variants={actionVariant}
            animate={isHover ? "hover" : "initial"}
            className="absolute top-2 right-2"
          >
            {action}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import React from "react";
import CardBase from "./Base";

type Props = {
  frontChildren: React.ReactNode;
  backChildren: React.ReactNode;
};

export default function CardFlip({ frontChildren, backChildren }: Props) {
  const [surface, setSurface] = React.useState("front");

  const onClick = () => {
    setSurface(surface === "front" ? "back" : "front");
  };

  return (
    <motion.div
      className="w-full h-full"
      transition={{ duration: 0.7 }}
      animate={{ rotateY: surface === "front" ? 0 : 180 }}
    >
      <motion.div
        className="w-full h-full"
        transition={{ duration: 0.7 }}
        animate={{ rotateY: surface === "front" ? 0 : 180 }}
        onClick={onClick}
      >
        <CardBase className="h-full w-full relative">
          <motion.div
            transition={{ duration: 0.7 }}
            animate={{ rotateY: surface === "front" ? 0 : 180 }}
            className="absolute top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            {frontChildren}
          </motion.div>
          <motion.div
            initial={{ rotateY: 180 }}
            transition={{ duration: 0.7 }}
            animate={{ rotateY: surface === "back" ? 0 : 180 }}
            className="absolute top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            {backChildren}
          </motion.div>
        </CardBase>
      </motion.div>
    </motion.div>
  );
}

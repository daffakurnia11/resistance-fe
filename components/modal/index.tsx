"use client";

import React from "react";
import Card from "../card";
import Typography from "../typography";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useAtom } from "jotai";
import { modalAtom } from "@/utils/atom";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal() {
  const [modal, setModal] = useAtom(modalAtom);

  const handleClose = () => {
    setModal({ ...modal, open: false });
  };

  return (
    <AnimatePresence>
      {modal.open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-30 top-0 backdrop-blur-[2px] w-full flex justify-center items-center"
          onClick={handleClose}
        >
          <div
            className="w-full overflow-auto max-h-[100vh] p-8 max-w-[400px] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card.Base className="w-full">
              <div className="flex justify-between items-center">
                <Typography.Heading
                  as={"h3"}
                  level={4}
                  className="text-green-secondary"
                >
                  {modal.header}
                </Typography.Heading>
                <XMarkIcon
                  className="h-6 w-6 text-green-secondary cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <div className="mt-4 text-base text-white">{modal.content}</div>
              {modal.footer && <div className="mt-4">{modal.footer}</div>}
            </Card.Base>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

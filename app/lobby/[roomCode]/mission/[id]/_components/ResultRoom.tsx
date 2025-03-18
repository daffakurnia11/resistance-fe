"use client";

import Card from "@/components/card";
import Typography from "@/components/typography";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

export default function ResultRoom() {
  const roomCode = useParams().roomCode;
  const [countdown, setCountdown] = React.useState(4);
  const [afterCountdown, setAfterCountdown] = React.useState(10);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      const timer = setInterval(() => {
        setAfterCountdown((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (afterCountdown === 0) {
      router.push(`/lobby/${roomCode}/mission`);
    }
  }, [afterCountdown]);

  return (
    <>
      <Typography.Heading
        as={"h1"}
        level={3}
        className="text-center text-green-secondary mb-6"
      >
        Mission Result
      </Typography.Heading>
      <div className="h-40">
        {countdown > 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl text-green-primary animate-pulse">
              {countdown}
            </span>
          </div>
        ) : (
          <motion.div
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card.Base
              className="w-full h-[150px]"
              innerClassName="!bg-action-green"
            >
              <div className="flex items-center justify-center h-full">
                <Typography.Heading
                  as="h3"
                  level={3}
                  className="text-center text-white"
                >
                  SUCCESS
                </Typography.Heading>
              </div>
            </Card.Base>
          </motion.div>
        )}
      </div>
      {countdown === 0 && (
        <Typography.Paragraph className="text-green-primary text-center mt-6">
          Redirecting to mission room in {afterCountdown}
        </Typography.Paragraph>
      )}
    </>
  );
}

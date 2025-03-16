"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Typography from "@/components/typography";
import { PlayerResponseData } from "@/types/Player";
import React from "react";
import { useReveal } from "./_components/Reveal.hook";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Reveal() {
  const { data, isLoading, player, countdown } = useReveal();
  const roomCode = useParams().roomCode;

  const FrontCard = (
    <Typography.Paragraph className="text-center text-green-primary">
      Click this card to reveal and <br /> know who you are
    </Typography.Paragraph>
  );
  const BackCard = !isLoading && data && (
    <div>
      <Typography.Paragraph
        className={clsx(
          "text-center text-white !text-xl !sm:text-xl",
          data.data.role === "SPY" ? "text-action-red" : "text-action-green"
        )}
      >
        {data.data.role}
      </Typography.Paragraph>
      {data.data.role === "SPY" && (
        <Typography.Paragraph className="text-center text-green-secondary">
          <span className="text-green-primary">Your teammate : </span>{" "}
          {data.data.teammate
            .map((teammate: PlayerResponseData) => teammate.name)
            .join(", ")}
        </Typography.Paragraph>
      )}
    </div>
  );

  return (
    <>
      <Typography.Heading
        as={"h1"}
        level={3}
        className="text-center text-green-secondary mb-6"
      >
        Reveal Your Role!
      </Typography.Heading>
      <div className="h-40">
        {!isLoading &&
          (countdown > 0 ? (
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
              <Card.Flip frontChildren={FrontCard} backChildren={BackCard} />
            </motion.div>
          ))}
      </div>
      {player!.room_role === "MASTER" &&
        (countdown === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/lobby/${roomCode}/mission`}>
              <Button.Primary className="w-full mt-6">
                Start the missions!
              </Button.Primary>
            </Link>
          </motion.div>
        ) : (
          <div className="content-none h-10 w-full mt-6"></div>
        ))}
    </>
  );
}

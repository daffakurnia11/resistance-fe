"use client";

import Card from "@/components/card";
import Typography from "@/components/typography";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {};

export default function Reveal({}: Props) {
  const FrontCard = (
    <Typography.Paragraph className="text-center text-green-primary">
      Click this card to reveal and <br /> know who you are
    </Typography.Paragraph>
  );
  const BackCard = (
    <div>
      <Typography.Paragraph className="text-center text-white !text-xl !sm:text-xl">
        Spy
      </Typography.Paragraph>
      <Typography.Paragraph className="text-center text-green-secondary">
        <span className="text-green-primary">Your teammate : </span> Player 2
      </Typography.Paragraph>
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
        <Card.Flip frontChildren={FrontCard} backChildren={BackCard} />
      </div>
    </>
  );
}

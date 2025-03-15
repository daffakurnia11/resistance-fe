"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Typography from "@/components/typography";
import { PlayerResponseData } from "@/types/Player";
import React from "react";
import { useReveal } from "./_components/Reveal.hook";

export default function Reveal() {
  const { data, isLoading, player } = useReveal();

  const FrontCard = (
    <Typography.Paragraph className="text-center text-green-primary">
      Click this card to reveal and <br /> know who you are
    </Typography.Paragraph>
  );
  const BackCard = !isLoading && data && (
    <div>
      <Typography.Paragraph className="text-center text-white !text-xl !sm:text-xl">
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
    !isLoading &&
    data && (
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
        {player!.room_role === "MASTER" && (
          <Button.Primary className="w-full mt-6">
            Start the missions!
          </Button.Primary>
        )}
      </>
    )
  );
}

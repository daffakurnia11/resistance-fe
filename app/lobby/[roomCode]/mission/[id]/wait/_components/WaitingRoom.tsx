"use client";

import Typography from "@/components/typography";
import React from "react";
import { useWaitingRoom } from "../_hooks/useWaitingRoom";

export default function WaitingRoom() {
  const { isClient, player } = useWaitingRoom();

  return (
    isClient && (
      <>
        <Typography.Heading
          as={"h1"}
          level={3}
          className="text-center text-green-secondary"
        >
          {player.name}
        </Typography.Heading>
        <Typography.Heading
          as={"h2"}
          level={5}
          className="text-center text-green-primary mt-10"
        >
          Waiting for player to do their job...
        </Typography.Heading>
      </>
    )
  );
}

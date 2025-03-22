import Typography from "@/components/typography";
import React from "react";
import { getCookie } from "cookies-next";

export default function WaitingRoom() {
  const player = JSON.parse((getCookie("playerData") as string) || "{}");

  return (
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
  );
}

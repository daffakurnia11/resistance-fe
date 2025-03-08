"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Typography from "@/components/typography";
import Link from "next/link";
import React from "react";
import { useLobby } from "./_components/Lobby.hook";

export default function Lobby() {
  const { isLoading, lobbyRoom, playerList, playerData } = useLobby();

  return (
    <>
      <Typography.Heading level={3} className="text-center">
        Room {lobbyRoom}
      </Typography.Heading>
      <Typography.Paragraph className="text-center mb-5 text-green-primary">
        Waiting for players to join...
      </Typography.Paragraph>
      <div className="flex flex-col gap-2">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-20">
            {!isLoading && playerList && playerList[i] ? (
              <div className="px-5">
                <Typography.Paragraph>
                  Player {i + 1}{" "}
                  {playerList[i].id === playerData.id && "(You)"}{" "}
                  {playerList[i].room_role == "MASTER" && "(Host)"}
                </Typography.Paragraph>
                <Typography.Small className="text-green-secondary">
                  {playerList[i].name}
                </Typography.Small>
              </div>
            ) : (
              <div className="px-5 flex justify-center items-center h-full">
                <Typography.Small className="text-green-primary">
                  Waiting for other player..
                </Typography.Small>
              </div>
            )}
          </Card>
        ))}
      </div>
      <Button.Primary className="w-full mt-4">Start Game</Button.Primary>
      <Link href="/" className="w-full">
        <Button.Secondary className="w-full mt-4">Leave Room</Button.Secondary>
      </Link>
    </>
  );
}

"use client";

import Button from "@/components/button";
import Typography from "@/components/typography";
import React from "react";
import PlayerCard from "./PlayerCard";
import { PlayerResponseData } from "@/types/Player";
import { useLobbyData } from "../_hooks/useLobbyData";
import { useLobbyAction } from "../_hooks/useLobbyAction";

export default function LobbyPage() {
  const { isClient, isLoading, lobbyRoom, playerList, currentPlayer } =
    useLobbyData();
  const { onLeave, onDelete, onStart } = useLobbyAction();

  if (!currentPlayer) {
    return null;
  }

  const isMaster = (item: PlayerResponseData) => {
    return item.id === currentPlayer?.id && item.room_role === "MASTER";
  };

  const isSelf = (item: PlayerResponseData) => {
    return item.id === currentPlayer?.id;
  };

  const isHost = (item: PlayerResponseData) => {
    return item.room_role === "MASTER";
  };

  const masterAction = (
    <>
      <Button.Primary
        className="w-full mt-4 max-w-[325px] mx-auto"
        disabled={playerList?.length !== 5 || isLoading}
        onClick={onStart}
      >
        Start Game
      </Button.Primary>
      <Button.Secondary
        className="w-full mt-4 max-w-[325px] mx-auto"
        onClick={onDelete}
        disabled={isLoading}
      >
        Delete Room
      </Button.Secondary>
    </>
  );

  const memberAction = (
    <Button.Secondary
      className="w-full mt-4 max-w-[325px] mx-auto"
      onClick={onLeave}
      disabled={isLoading}
    >
      Leave Room
    </Button.Secondary>
  );

  return (
    isClient && (
      <>
        <Typography.Heading
          as={"h1"}
          level={3}
          className="text-center mb-2"
          isLoading={isLoading || !Boolean(lobbyRoom)}
          loadingClassName="w-full max-w-[150px] mx-auto mb-2"
        >
          Room {lobbyRoom}
        </Typography.Heading>
        {playerList && playerList.length !== 5 ? (
          <Typography.Paragraph
            className="text-center text-green-primary"
            isLoading={isLoading}
            loadingClassName="max-w-[325px] mx-auto"
          >
            Waiting for players to join...
          </Typography.Paragraph>
        ) : (
          <Typography.Paragraph
            className="text-center text-green-primary"
            isLoading={isLoading}
            loadingClassName="max-w-[325px] mx-auto"
          >
            {currentPlayer?.room_role !== "MASTER"
              ? "Waiting for host to start game..."
              : "Start the game when you're ready!"}
          </Typography.Paragraph>
        )}
        <div className="flex flex-wrap justify-center gap-2 mt-5 mb-10 w-full max-w-[700px] mx-auto">
          {[...Array(5)].map((_, i) =>
            !isLoading && playerList && playerList[i] ? (
              <PlayerCard
                key={i}
                state={
                  isMaster(playerList[i])
                    ? "master"
                    : isSelf(playerList[i])
                    ? "self"
                    : isHost(playerList[i])
                    ? "host"
                    : "default"
                }
                playerNumber={i + 1}
                playerData={playerList[i]}
                role={currentPlayer?.room_role}
              />
            ) : isLoading ? (
              <PlayerCard key={i} state="loading" isLoading />
            ) : (
              <PlayerCard key={i} state="waiting" />
            )
          )}
        </div>
        {currentPlayer.room_role === "MASTER" ? masterAction : memberAction}
      </>
    )
  );
}

"use client";

import Button from "@/components/button";
import Typography from "@/components/typography";
import React from "react";
import { useLobbyAction, useLobbyData } from "./_components/Lobby.hook";
import PlayerCard from "./_components/PlayerCard";
import { PlayerResponseData } from "@/types/Player";

export default function Lobby() {
  const { isLoading, lobbyRoom, playerList, currentPlayer } = useLobbyData();
  const { onLeave, onDelete } = useLobbyAction();

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

  return (
    <>
      <Typography.Heading level={3} className="text-center">
        Room {lobbyRoom}
      </Typography.Heading>
      {playerList && playerList.length !== 5 ? (
        <Typography.Paragraph className="text-center text-green-primary">
          Waiting for players to join...
        </Typography.Paragraph>
      ) : (
        <Typography.Paragraph className="text-center text-green-primary">
          Waiting for host to start game...
        </Typography.Paragraph>
      )}
      <div className="flex flex-col gap-2 mt-5 mb-10">
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
          ) : (
            <PlayerCard key={i} state="waiting" />
          )
        )}
      </div>
      {currentPlayer?.room_role === "MASTER" ? (
        <>
          <Button.Primary
            className="w-full mt-4"
            disabled={playerList?.length !== 5}
          >
            Start Game
          </Button.Primary>
          <Button.Secondary className="w-full mt-4" onClick={onDelete}>
            Delete Room
          </Button.Secondary>
        </>
      ) : (
        <Button.Secondary className="w-full mt-4" onClick={onLeave}>
          Leave Room
        </Button.Secondary>
      )}
    </>
  );
}

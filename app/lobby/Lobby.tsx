"use client";

import Button from "@/components/button";
import Typography from "@/components/typography";
import React from "react";
import { useLobbyAction, useLobbyData } from "./_components/Lobby.hook";
import PlayerCard from "./_components/PlayerCard";
import { PlayerResponseData } from "@/types/Player";

export default function Lobby() {
  const { isLoading, lobbyRoom, playerList, currentPlayer } = useLobbyData();
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

  return (
    <>
      <Typography.Heading
        as={"h1"}
        level={3}
        className="text-center mb-2"
        isLoading={isLoading || !Boolean(lobbyRoom)}
        loadingClassName="!w-1/2 mb-2"
      >
        Room {lobbyRoom}
      </Typography.Heading>
      {playerList && playerList.length !== 5 ? (
        <Typography.Paragraph
          className="text-center text-green-primary"
          isLoading={isLoading}
        >
          Waiting for players to join...
        </Typography.Paragraph>
      ) : (
        <Typography.Paragraph
          className="text-center text-green-primary"
          isLoading={isLoading}
        >
          {currentPlayer?.room_role !== "MASTER"
            ? "Waiting for host to start game..."
            : "Start the game when you're ready!"}
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
          ) : isLoading ? (
            <PlayerCard key={i} state="loading" isLoading />
          ) : (
            <PlayerCard key={i} state="waiting" />
          )
        )}
      </div>
      {currentPlayer?.room_role === "MASTER" ? (
        <>
          <Button.Primary
            className="w-full mt-4"
            disabled={playerList?.length !== 5 || isLoading}
            onClick={onStart}
          >
            Start Game
          </Button.Primary>
          <Button.Secondary
            className="w-full mt-4"
            onClick={onDelete}
            disabled={isLoading}
          >
            Delete Room
          </Button.Secondary>
        </>
      ) : (
        <Button.Secondary
          className="w-full mt-4"
          onClick={onLeave}
          disabled={isLoading}
        >
          Leave Room
        </Button.Secondary>
      )}
    </>
  );
}

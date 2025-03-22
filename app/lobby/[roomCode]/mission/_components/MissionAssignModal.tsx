"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Loading from "@/components/loading";
import Typography from "@/components/typography";
import { MissionResponseType } from "@/types/Mission";
import { PlayerResponseData } from "@/types/Player";
import React from "react";
import { useMissionAssign } from "../_hooks/useMissionAssign";

export default function MissionAssignModal({
  mission,
}: {
  mission: MissionResponseType;
}) {
  const {
    data,
    isLoading,
    handleSelectPlayer,
    innerClassName,
    handleAssign,
    selectedPlayers,
    getRule,
    isSubmitting,
  } = useMissionAssign(mission);

  return (
    <div className="flex flex-col gap-2">
      <Typography.Paragraph>
        <span className="text-green-primary">Leader :</span>{" "}
        <span className="text-green-white">{mission.leader.name}</span>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className="text-green-primary">Assigned to</span>
      </Typography.Paragraph>
      {isLoading
        ? [...Array(5)].map((_, index: number) => (
            <Card.Base key={index} className="h-[54px]">
              <Loading
                className="w-1/2 h-[22px] !ms-0 !me-auto"
                isLoading={true}
              />
            </Card.Base>
          ))
        : data.data.players.map((player: PlayerResponseData, index: number) => (
            <Card.Base
              key={index}
              onClick={() => handleSelectPlayer(player.id)}
              innerClassName={innerClassName(player.id)}
            >
              <Typography.Paragraph>
                <span className="text-green-white">{player.name}</span>
              </Typography.Paragraph>
            </Card.Base>
          ))}
      <Button.Primary
        className="mt-6"
        onClick={handleAssign}
        disabled={
          selectedPlayers.length !== getRule()?.maxPlayer || isSubmitting
        }
      >
        Assign
      </Button.Primary>
    </div>
  );
}

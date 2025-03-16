"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Loading from "@/components/loading";
import Typography from "@/components/typography";
import { useLobbyPlayerApi } from "@/services/swrs/use-lobby";
import { MissionResponseType } from "@/types/Mission";
import { PlayerResponseData } from "@/types/Player";
import { modalAtom } from "@/utils/jotai/atom";
import { missionRule } from "@/utils/missionRule";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import React from "react";

export default function MissionAssignModal({
  mission,
}: {
  mission: MissionResponseType;
}) {
  const roomCode = useParams().roomCode as string;
  const { data, isLoading } = useLobbyPlayerApi(roomCode);
  const [selectedPlayers, setSelectedPlayers] = React.useState<string[]>([]);
  const [modal, setModal] = useAtom(modalAtom);

  const getRule = () => {
    return missionRule.find((rule) => rule.name === mission.name);
  };

  const handleSelectPlayer = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers((prev) => prev.filter((id) => id !== playerId));
    } else {
      if (getRule()?.maxPlayer !== selectedPlayers.length) {
        setSelectedPlayers((prev) => [...prev, playerId]);
      }
    }
  };

  const innerClassName = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      return "bg-green-primary";
    }
    return "";
  };

  const handleAssign = () => {
    console.log(
      "POST /mission/{mission_id}/assign",
      "Payload:",
      selectedPlayers
    );
    setModal({ ...modal, open: false });
  };

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
        disabled={selectedPlayers.length !== getRule()?.maxPlayer}
      >
        Assign
      </Button.Primary>
    </div>
  );
}

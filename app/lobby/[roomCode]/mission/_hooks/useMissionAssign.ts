import { useLobbyPlayerApi } from "@/services/swrs/use-lobby";
import { MissionResponseType } from "@/types/Mission";
import { modalAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import React from "react";
import { missionRule } from "@/utils/missionRule";

export const useMissionAssign = (mission: MissionResponseType) => {
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

  return {
    data,
    isLoading,
    handleSelectPlayer,
    innerClassName,
    handleAssign,
    selectedPlayers,
    getRule,
  };
};

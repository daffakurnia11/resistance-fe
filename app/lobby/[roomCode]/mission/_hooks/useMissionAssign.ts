import { useLobbyMissionApi, useLobbyPlayerApi } from "@/services/swrs/use-lobby";
import { MissionAssignPayload, MissionResponseType } from "@/types/Mission";
import { modalAtom, notifContent } from "@/utils/atom";
import { useAtom, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import React from "react";
import { missionRule } from "@/utils/missionRule";
import { missionApi } from "@/services/apis/mission-api";

export const useMissionAssign = (mission: MissionResponseType) => {
  const roomCode = useParams().roomCode as string;
  const { data, isLoading } = useLobbyPlayerApi(roomCode);
  const [selectedPlayers, setSelectedPlayers] = React.useState<string[]>([]);
  const [modal, setModal] = useAtom(modalAtom);
  const setNotif = useSetAtom(notifContent);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { mutate } = useLobbyMissionApi(roomCode);

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

  const handleAssign = async () => {
    setIsSubmitting(true);
    const payload: MissionAssignPayload = {
      leader_id: mission.leader.id,
      player_ids: selectedPlayers,
    };
    try {
      await missionApi.assign(mission.id, payload).then(() => {
        mutate();
        setModal({ ...modal, open: false });
      })
    } catch (err: any) {
      try {
        setNotif({
          title: "Error",
          message: err.error.message[0],
        });
      } catch (error: any) {
        setNotif({
          title: "Error",
          message: "Something went wrong",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    data,
    isLoading,
    handleSelectPlayer,
    innerClassName,
    handleAssign,
    selectedPlayers,
    getRule,
    isSubmitting,
  };
};

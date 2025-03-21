import { MissionResponseType } from "@/types/Mission";
import { modalAtom, notifContent } from "@/utils/atom";
import { useSetAtom } from "jotai";
import MissionAssignModal from "../_components/MissionAssignModal";
import MissionVoteModal from "../_components/MissionVoteModal";
import MissionResultModal from "../_components/MissionResultModal";
import { useParams } from "next/navigation";
import { useLobbyMissionApi } from "@/services/swrs/use-lobby";
import { useSocket } from "@/hooks/use-socket";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";

export const useMission = () => {
  const setModal = useSetAtom(modalAtom);
  const setNotif = useSetAtom(notifContent);
  const roomCode = useParams().roomCode;
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const { data, isLoading, mutate } = useLobbyMissionApi(roomCode as string);
  const { socketData: missionLog } = useSocket("mission_log");

  useEffect(() => {
    if (!missionLog) return;
    console.log(missionLog);
    mutate();
    if (missionLog && missionLog.status === "ASSIGNED") {
      setNotif({
        title: "Mission has been assigned!",
      });
    }
  }, [missionLog]);

  const getStatus = React.useCallback(
    (mission: MissionResponseType) => {
      if (
        mission.status === "VOTING" &&
        mission.mission_votes.some((vote) => vote.player_id === player.id)
      ) {
        return "VOTED";
      } else {
        return mission.status;
      }
    },
    [player.id]
  );

  const openModal = (mission: MissionResponseType) => {
    if (mission.status === "ASSIGNING" && mission.leader.id !== player.id) {
      setNotif({
        title: "You are not the leader!",
        message: "Only the leader can assign players",
      });
      return;
    } else if (
      mission.status === "VOTING" &&
      mission.mission_votes.some((vote) => vote.player_id === player.id)
    ) {
      setNotif({
        title: "You have already voted!",
        message: "You cannot vote more than once",
      });
      return;
    }
    setModal({
      open: true,
      header: mission.name,
      content:
        mission.status === "ASSIGNING" ? (
          <MissionAssignModal mission={mission} />
        ) : mission.status === "VOTING" ? (
          <MissionVoteModal mission={mission} />
        ) : (
          <MissionResultModal mission={mission} />
        ),
      footer: null,
    });
  };

  return { data, isLoading, openModal, getStatus };
};

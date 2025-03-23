import {
  MissionPlayerResponseType,
  MissionResponseType,
} from "@/types/Mission";
import { modalAtom, notifContent } from "@/utils/atom";
import { useSetAtom } from "jotai";
import MissionAssignModal from "../_components/MissionAssignModal";
import MissionVoteModal from "../_components/MissionVoteModal";
import MissionResultModal from "../_components/MissionResultModal";
import { useParams, useRouter } from "next/navigation";
import { useLobbyMissionApi } from "@/services/swrs/use-lobby";
import { useSocket } from "@/hooks/use-socket";
import React, { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import WinnerModal from "../_components/WinnerModal";
import { PlayerResponseData } from "@/types/Player";
import { lobbyApi } from "@/services/apis/lobby-api";

export const useMission = () => {
  const router = useRouter();
  const setModal = useSetAtom(modalAtom);
  const setNotif = useSetAtom(notifContent);
  const roomCode = useParams().roomCode;
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const { data, isLoading, mutate } = useLobbyMissionApi(roomCode as string);
  const { socketData: lobbyLog } = useSocket("lobby_log");
  const { socketData: missionLog } = useSocket("mission_log");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const openResultModal = () => {
    const resistanceList = data.data.players
      .filter((player: PlayerResponseData) => player.role === "RESISTANCE")
      .map((player: PlayerResponseData) => player.name);

    const spyList = data.data.players
      .filter((player: PlayerResponseData) => player.role === "SPY")
      .map((player: PlayerResponseData) => player.name);

    setModal({
      open: true,
      header: "Winner",
      content: (
        <WinnerModal
          winner={data.data.winner}
          resistanceList={resistanceList}
          spyList={spyList}
        />
      ),
      footer: null,
    });
  };

  useEffect(() => {
    if (!data) return;
    if (data.data.winner) {
      openResultModal();
    }
  }, [data]);

  useEffect(() => {
    if (lobbyLog && lobbyLog.action === "END") {
      setNotif({
        title: "Game Ended",
      });
      router.push(`/lobby/${roomCode}`);
    }
  }, [lobbyLog]);

  useEffect(() => {
    if (!missionLog) return;
    mutate();
    if (missionLog && missionLog.status === "ASSIGNED") {
      setNotif({
        title: "Mission has been assigned!",
      });
    } else if (missionLog && missionLog.status === "REASSIGNING") {
      setNotif({
        title: "Players Rejected!",
        message: "Leader needs to reassign players",
      });
    } else if (missionLog && missionLog.status === "START") {
      const missionData = data.data.missions.find(
        (mission: MissionResponseType) => mission.id === missionLog.mission_id
      );

      setNotif({
        title: "Mission has started!",
        message: "Let's play for the mission",
      });
      setCookie("missionData", JSON.stringify(missionData));
      if (
        missionData.mission_players.some(
          (missionPlayer: MissionPlayerResponseType) =>
            missionPlayer.player_id === player.id
        )
      ) {
        router.push(`/lobby/${roomCode}/mission/${missionLog.mission_id}/play`);
      } else {
        router.push(`/lobby/${roomCode}/mission/${missionLog.mission_id}/wait`);
      }
    }
  }, [missionLog]);

  const getStatus = React.useCallback(
    (mission: MissionResponseType) => {
      if (
        mission.status === "VOTING" &&
        mission.mission_votes.some((vote) => vote.player_id === player.id)
      ) {
        return "VOTED";
      } else if (mission.status === "IN_PLAY") {
        return "PLAYING";
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

  const handleOpenMission = (mission: MissionResponseType) => {
    if (mission.status !== "OPEN") {
      if (mission.status === "IN_PLAY") {
        if (
          mission.mission_players.some(
            (missionPlayer: MissionPlayerResponseType) =>
              missionPlayer.player_id === player.id
          )
        ) {
          router.push(`/lobby/${roomCode}/mission/${mission.id}/play`);
        } else {
          router.push(`/lobby/${roomCode}/mission/${mission.id}/wait`);
        }
      } else {
        openModal(mission);
      }
    }
  };

  const handleEndGame = async () => {
    setIsSubmitting(true);
    try {
      await lobbyApi.endGame(data.data.id, player.id).then(() => {
        setNotif({
          title: "Game Ended",
        });
      });
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
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    isLoading,
    getStatus,
    handleOpenMission,
    player,
    openResultModal,
    handleEndGame,
    isSubmitting,
  };
};

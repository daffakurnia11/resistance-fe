import { missionApi } from "@/services/apis/mission-api";
import { MissionPlayerResponseType, MissionResponseType, MissionVotePayload } from "@/types/Mission";
import { modalAtom, notifContent } from "@/utils/atom";
import { getCookie } from "cookies-next";
import { useAtom, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import React from "react";

export const useMissionVote = (mission: MissionResponseType) => {
  const roomCode = useParams().roomCode as string;
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const [modal, setModal] = useAtom(modalAtom);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const setNotif = useSetAtom(notifContent);

  const handleVote = async (vote: "APPROVE" | "REJECT") => {
    setIsSubmitting(true);
        const payload: MissionVotePayload = {
          player_id: player.id,
          vote,
          mission_players: mission.mission_players.map((missionPlayer: MissionPlayerResponseType) => missionPlayer.player_id),
        };
        try {
          await missionApi.vote(mission.id, payload).then(() => {
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

  return { handleVote, isSubmitting };
}
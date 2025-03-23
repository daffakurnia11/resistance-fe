import React from "react";
import { getCookie } from "cookies-next";
import { MissionPlayPayload } from "@/types/Mission";
import { missionApi } from "@/services/apis/mission-api";
import { useSetAtom } from "jotai";
import { notifContent } from "@/utils/atom";
import { useParams, useRouter } from "next/navigation";

export const usePlayRoom = () => {
  const { roomCode, id } = useParams();
  const router = useRouter();
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const [result, setResult] = React.useState<"SUCCESS" | "FAIL" | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const setNotif = useSetAtom(notifContent);

  const subtitle = () => {
    if (player.role === "SPY") {
      return "You are a spy, try to sabotage the mission";
    }
    return "You are a resistance, try to complete the mission";
  };

  const handleResult = (state: "SUCCESS" | "FAIL") => {
    if (result === state) {
      setResult(null);
    } else {
      setResult(state);
    }
  };

  const innerClassName = (state: string) => {
    if (result === state && result === "SUCCESS") {
      return "!bg-action-green";
    } else if (result === state && result === "FAIL") {
      return "!bg-action-red";
    }
    return "";
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    const payload: MissionPlayPayload = {
      player_id: player.id,
      state: result!,
    };
    try {
      await missionApi.play(id as string, payload).then(() => {
        setNotif({
          title: "Mission Done!",
          message: "Wait for other player to do their mission",
        });
        router.push(`/lobby/${roomCode}/mission/${id}/wait`);
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
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    subtitle,
    handleResult,
    innerClassName,
    result,
    onSubmit,
    player,
    isSubmitting,
  };
};

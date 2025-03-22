import React from "react";
import { getCookie, setCookie } from "cookies-next";
import { MissionPlayerResponseType, MissionPlayPayload } from "@/types/Mission";
import { missionApi } from "@/services/apis/mission-api";
import { useSetAtom } from "jotai";
import { notifContent, playAtom } from "@/utils/atom";

export const usePlayRoom = () => {
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const mission = JSON.parse((getCookie("missionData") as string) || "{}");
  const [result, setResult] = React.useState<"SUCCESS" | "FAIL" | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const setNotif = useSetAtom(notifContent);
  const setPlay = useSetAtom(playAtom)

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
      await missionApi.play(mission.id, payload).then(() => {
        setNotif({
          title: "Mission Done!",
          message: "Wait for other player to do their mission",
        });
        setPlay('waiting')
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
    isSubmitting
  };
};

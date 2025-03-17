import { useParams } from "next/navigation";
import React from "react";
import fakeData from "../fakeData.json";
import { getCookie } from "cookies-next";

export const useMissionRoom = () => {
  const missionId = useParams().id;
  const player = JSON.parse(getCookie("playerData") as string || "{}");
  const [result, setResult] = React.useState<string | null>(null);
  console.log(`GET mission/${missionId}`, fakeData);

  const subtitle = () => {
    if (fakeData.data.mission_players[0].role === "SPY") {
      return "You are a spy, try to sabotage the mission";
    }
    return "You are a resistance, try to complete the mission";
  };

  const handleResult = (state: string) => {
    if (result === state) {
      setResult(null);
    } else {
      setResult(state);
    }
  };

  const innerClassName = (state: string) => {
    if (result === state && result === "SUCCESS") {
      return "bg-action-green";
    } else if (result === state && result === "FAIL") {
      return "bg-action-red";
    }
    return "";
  };

  const onSubmit = () => {
    console.log(`POST mission/${missionId}/result`, "Payload:", {
      player_id: player.id,
      result,
    })
  }

  return {
    subtitle,
    handleResult,
    innerClassName,
    result,
    onSubmit
  };
}
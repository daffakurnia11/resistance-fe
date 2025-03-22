import { useSocket } from "@/hooks/use-socket";
import { useMissionApi } from "@/services/swrs/use-mission";
import { MissionPlayerResponseType } from "@/types/Mission";
import { playAtom } from "@/utils/atom";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const useMissionRoom = () => {
  const id = useParams().id;
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const { socketData: missionLog } = useSocket("mission_log");
  const [state, setState] = useAtom(playAtom);

  const { data, isLoading } = useMissionApi(id as string);

  useEffect(() => {
    if (!data) return;
    if (missionLog && missionLog.status === "CLOSED") {
      setState("result");
    } else {
      const missionPlayer = data?.data.mission_players.find(
        (mp: MissionPlayerResponseType) => mp.player_id  === player.id
      );
      if (missionPlayer && !missionPlayer.state) {
        setState("playing");
      } else {
        setState("waiting");
      }
    }
  }, [data, missionLog]);

  return { data, isLoading, state, missionLog, player };
};

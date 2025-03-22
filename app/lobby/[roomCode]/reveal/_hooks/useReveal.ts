import { useSocket } from "@/hooks/use-socket";
import { missionApi } from "@/services/apis/mission-api";
import { usePlayerRevealApi } from "@/services/swrs/use-player";
import { LobbyResponseData } from "@/types/Lobby";
import { MissionStartPayload } from "@/types/Mission";
import { PlayerResponseData } from "@/types/Player";
import { notifContent } from "@/utils/atom";
import { getCookie, setCookie } from "cookies-next";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const useReveal = () => {
  const lobby: LobbyResponseData = JSON.parse(
    (getCookie("lobbyData") as string) || "{}"
  );
  const player: PlayerResponseData = JSON.parse(
    (getCookie("playerData") as string) || "{}"
  );
  const { socketData: lobbySocket } = useSocket("lobby_log");
  const [countdown, setCountdown] = React.useState(4);
  const setNotif = useSetAtom(notifContent);
  const [isStarting, setIsStarting] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!lobby || !player) {
      window.location.href = "/";
    }
  }, [lobby, player]);
  if (!lobby || !player)
    return { data: null, isLoading: true, player, countdown };

  const { data, isLoading } = usePlayerRevealApi(lobby!.id, player!.id);

  useEffect(() => {
    if (!data) return;
    setCookie("playerData", data.data);
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [!isLoading]);

  useEffect(() => {
    if (!lobbySocket) return;

    if (lobbySocket.action === "START") {
      router.push(`/lobby/${lobby!.room_code}/mission`);
    }
  }, [lobbySocket]);

  const handleStart = async () => {
    setIsStarting(true);
    const payload: MissionStartPayload = {
      lobby_id: lobby!.id,
      player_id: player!.id,
    };
    try {
      await missionApi.start(payload).then((res) => {
        if (res.success) {
          setNotif({
            title: "Mission started",
            message: "The mission has started by host",
          });
          router.push(`/lobby/${lobby!.room_code}/mission`);
        } else {
          setNotif({
            title: "Error",
            message: res.message,
          });
        }
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
      setIsStarting(false);
    }
  };

  return { data, isLoading, player, countdown, handleStart, isStarting };
};

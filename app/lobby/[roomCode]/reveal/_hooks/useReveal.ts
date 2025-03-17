import { usePlayerRevealApi } from "@/services/swrs/use-player";
import { LobbyResponseData } from "@/types/Lobby";
import { PlayerResponseData } from "@/types/Player";
import { getCookie, setCookie } from "cookies-next";
import React, { useEffect } from "react";

export const useReveal = () => {
  const lobby: LobbyResponseData = JSON.parse(
    (getCookie("lobbyData") as string) || "{}"
  );
  const player: PlayerResponseData = JSON.parse(
    (getCookie("playerData") as string) || "{}"
  );
  const [countdown, setCountdown] = React.useState(4);

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

  return { data, isLoading, player, countdown };
};

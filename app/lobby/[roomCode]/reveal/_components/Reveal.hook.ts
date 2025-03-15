import { usePlayerRevealApi } from "@/services/swrs/use-player";
import { LobbyResponseData } from "@/types/Lobby";
import { PlayerResponseData } from "@/types/Player";
import cookieStorage from "@/utils/cookies-storage";
import React, { useEffect } from "react";

export const useReveal = () => {
  const lobby: LobbyResponseData | null = cookieStorage.load("lobbyData");
  const player: PlayerResponseData | null = cookieStorage.load("playerData");
  const [countdown, setCountdown] = React.useState(4);
  
  useEffect(() => {
    if (!lobby || !player) {
      window.location.href = "/";
    }
  }, [lobby, player]);
  if (!lobby || !player) return { data: null, isLoading: true, player, countdown };

  const { data, isLoading } = usePlayerRevealApi(lobby!.id, player!.id);

  useEffect(() => {
    if (!data) return;
    cookieStorage.save("playerData", data.data);
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

import { usePlayerRevealApi } from "@/services/swrs/use-player";
import { LobbyResponseData } from "@/types/Lobby";
import { PlayerResponseData } from "@/types/Player";
import cookieStorage from "@/utils/cookies-storage";
import { useEffect } from "react";

export const useReveal = () => {
  const lobby: LobbyResponseData | null = cookieStorage.load("lobbyData");
  const player: PlayerResponseData | null = cookieStorage.load("playerData");
  useEffect(() => {
    if (!lobby || !player) {
      window.location.href = "/";
    }
  }, [lobby, player]);
  if (!lobby || !player) return { data: null, isLoading: true, player };
  const { data, isLoading } = usePlayerRevealApi(lobby!.id, player!.id);

  useEffect(() => {
    if (!data) return;
    cookieStorage.save("playerData", data.data);
  }, [data]);

  return { data, isLoading, player };
};

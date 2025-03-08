import { useSocket } from "@/hooks/use-socket";
import { useLobbyApi } from "@/services/swrs/use-lobby";
import { PlayerResponseData } from "@/types/Lobby";
import cookieStorage from "@/utils/cookies-storage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useLobby = () => {
  const params = useSearchParams();
  const roomCode = params.get("roomCode");
  const playerData: PlayerResponseData = cookieStorage.load("playerData")!;
  const { data, isLoading } = useLobbyApi(roomCode!);
  const { socketData } = useSocket("lobby_update");
  const [playerList, setPlayerList] = useState<PlayerResponseData[]>([]);
  const [lobbyRoom, setLobbyRoom] = useState<string>("");

  const updateLobbyData = (data: { players: PlayerResponseData[], room_code: string }) => {
    setPlayerList(data.players);
    setLobbyRoom(data.room_code);
  };

  useEffect(() => {
    if (data) {
      updateLobbyData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (socketData) {
      updateLobbyData(socketData);
    }
  }, [socketData]);

  return {
    isLoading,
    lobbyRoom,
    playerList,
    playerData,
  };
};

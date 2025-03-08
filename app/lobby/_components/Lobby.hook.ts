import { useSocket } from "@/hooks/use-socket";
import { lobbyApi } from "@/services/apis/lobby-api";
import { useLobbyApi } from "@/services/swrs/use-lobby";
import { LobbyResponseData, PlayerResponseData } from "@/types/Lobby";
import cookieStorage from "@/utils/cookies-storage";
import { notifContent } from "@/utils/jotai/atom";
import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useLobbyData = () => {
  const params = useSearchParams();
  const router = useRouter();
  const roomCode = params.get("roomCode");
  const currentPlayer: PlayerResponseData | null =
    cookieStorage.load("playerData");
  const { data, isLoading } = useLobbyApi(roomCode!);
  const { socketData } = useSocket("lobby_update");
  const [playerList, setPlayerList] = useState<PlayerResponseData[]>([]);
  const [lobbyRoom, setLobbyRoom] = useState<string>("");
  const setNotif = useSetAtom(notifContent);

  const updateLobbyData = (data: {
    players: PlayerResponseData[];
    room_code: string;
  }) => {
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

  useEffect(() => {
    if (
      playerList &&
      playerList.length > 0 &&
      !playerList?.find(
        (player: PlayerResponseData) => player.id === currentPlayer?.id
      )
    ) {
      cookieStorage.clear();
      router.push("/");
      setNotif({
        title: "Kicked",
        message: "You have been kicked from the room",
      });
    }
  }, [playerList]);

  return {
    isLoading,
    lobbyRoom,
    playerList,
    currentPlayer,
  };
};

export const useLobbyAction = () => {
  const router = useRouter();
  const lobby: LobbyResponseData = cookieStorage.load("lobbyData")!;
  const player: PlayerResponseData = cookieStorage.load("playerData")!;
  const setNotif = useSetAtom(notifContent);

  const onLeave = async () => {
    const payload = {
      player_id: player.id,
      room_code: lobby.room_code,
    };

    try {
      await lobbyApi.leaveLobby(payload).then(() => {
        router.push("/");
        cookieStorage.clear();
        setNotif({
          title: "Left room",
          message: "You have successfully left the room",
        });
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const onKick = async (player_id: string) => {
    const payload = {
      player_id,
      room_code: lobby.room_code,
    };

    try {
      await lobbyApi.leaveLobby(payload).then(() => {
        setNotif({
          title: "Kicked player",
          message: "You have successfully kicked a player",
        });
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return { onLeave, onKick };
};

import { useSocket } from "@/hooks/use-socket";
import { lobbyApi } from "@/services/apis/lobby-api";
import { playerApi } from "@/services/apis/player-api";
import { useLobbyApi } from "@/services/swrs/use-lobby";
import { LobbyResponseData } from "@/types/Lobby";
import { PlayerResponseData } from "@/types/Player";
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
  const { socketData: playerSocket } = useSocket("player_update");
  const { socketData: lobbySocket } = useSocket("lobby_log");
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
    if (playerSocket) {
      updateLobbyData(playerSocket);
    }
  }, [playerSocket]);

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

  useEffect(() => {
    const player: PlayerResponseData = cookieStorage.load("playerData")!;
    if (
      lobbySocket &&
      lobbySocket.action &&
      player &&
      player.id !== lobbySocket.player_id
    ) {
      switch (lobbySocket.action) {
        case "JOIN":
          setNotif({
            title: "Player has joined the lobby",
          });
          return;
        case "LEAVE":
          setNotif({
            title: "Player has left the lobby",
          });
          return;
        case "KICK":
          setNotif({
            title: "Player has been kicked by the host",
          });
          return;
        case "DISBAND":
          cookieStorage.clear();
          router.push("/");
          setNotif({
            title: "Lobby has been deleted by the host",
          });
          return;
      }
    }
  }, [lobbySocket]);

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
      await playerApi.leave(payload).then(() => {
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
      await playerApi.kick(payload);
    } catch (err: any) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    try {
      await lobbyApi.delete(lobby.id).then(() => {
        router.push("/");
        cookieStorage.clear();
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return { onLeave, onKick, onDelete };
};

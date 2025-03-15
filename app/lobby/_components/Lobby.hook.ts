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
import { useCallback, useEffect, useState } from "react";

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

  const updateLobbyData = useCallback(
    (newData: { players: PlayerResponseData[]; room_code: string }) => {
      setPlayerList(newData.players);
      setLobbyRoom(newData.room_code);
    },
    []
  );

  useEffect(() => {
    if (data) updateLobbyData(data.data);
  }, [data, updateLobbyData]);

  useEffect(() => {
    if (playerSocket) updateLobbyData(playerSocket);
  }, [playerSocket, updateLobbyData]);

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
    if (!lobbySocket) return;

    const player: PlayerResponseData = cookieStorage.load("playerData")!;
    if (!player) return;

    if (lobbySocket.action === "DISBAND") {
      cookieStorage.clear();
      router.push("/");
      setNotif({ title: "Lobby has been deleted by the host" });
      return;
    }

    if (player.id !== lobbySocket.player_id) {
      const messages: any = {
        JOIN: "Player has joined the lobby",
        LEAVE: "Player has left the lobby",
        KICK: "Player has been kicked by the host",
      };

      if (lobbySocket.action in messages) {
        setNotif({ title: messages[lobbySocket.action] });
      }
    }
  }, [lobbySocket, router, setNotif]);

  return { isLoading, lobbyRoom, playerList, currentPlayer };
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

  const onStart = async () => {
    try {
      await playerApi.assign(lobby.id).then(() => {
        router.push(`/lobby/${lobby.room_code}/reveal`);
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  return { onLeave, onKick, onDelete, onStart };
};

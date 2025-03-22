import { useSocket } from "@/hooks/use-socket";
import { useLobbyApi } from "@/services/swrs/use-lobby";
import { PlayerResponseData } from "@/types/Player";
import { notifContent } from "@/utils/atom";
import { deleteCookie, getCookie } from "cookies-next";
import { useSetAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useLobbyData = () => {
  const roomCode = useParams().roomCode!;
  const router = useRouter();
  const currentPlayer: PlayerResponseData = JSON.parse(
    (getCookie("playerData") as string) || "{}"
  );
  const { data, isLoading } = useLobbyApi(roomCode as string);
  const { socketData: playerSocket } = useSocket("player_update");
  const { socketData: lobbySocket } = useSocket("lobby_log");
  const [playerList, setPlayerList] = useState<PlayerResponseData[]>([]);
  const [lobbyRoom, setLobbyRoom] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const setNotif = useSetAtom(notifContent);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      deleteCookie("playerData");
      deleteCookie("lobbyData");
      router.push("/");
      setNotif({
        title: "Kicked",
        message: "You have been kicked from the room",
      });
    }
  }, [playerList]);

  useEffect(() => {
    if (!lobbySocket) return;

    const player: PlayerResponseData = JSON.parse(
      (getCookie("playerData") as string) || "{}"
    );
    if (!player) return;

    if (lobbySocket.action === "DISBAND") {
      deleteCookie("playerData");
      deleteCookie("lobbyData");
      router.push("/");
      setNotif({ title: "Lobby has been deleted by the host" });
      return;
    }

    if (lobbySocket.action === "ASSIGN") {
      if (player.id === lobbySocket.player_id) {
        setNotif({ title: "You started the game" });
      } else {
        setNotif({ title: "Game has started by host" });
      }
      router.push(`/lobby/${lobbyRoom}/reveal`);
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

  if (currentPlayer?.role) {
    router.push(`/lobby/${roomCode}/reveal`);
  }

  return { isClient, isLoading, lobbyRoom, playerList, currentPlayer };
};

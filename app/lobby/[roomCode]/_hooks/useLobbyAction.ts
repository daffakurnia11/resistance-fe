import { lobbyApi } from "@/services/apis/lobby-api";
import { playerApi } from "@/services/apis/player-api";
import { LobbyResponseData } from "@/types/Lobby";
import { PlayerResponseData } from "@/types/Player";
import { notifContent } from "@/utils/atom";
import { deleteCookie, getCookie } from "cookies-next";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export const useLobbyAction = () => {
  const router = useRouter();
  const lobby: LobbyResponseData = JSON.parse(
    (getCookie("lobbyData") as string) || "{}"
  );
  const player: PlayerResponseData = JSON.parse(
    (getCookie("playerData") as string) || "{}"
  );
  const setNotif = useSetAtom(notifContent);

  const onLeave = async () => {
    const payload = {
      player_id: player.id,
      room_code: lobby.room_code,
    };

    try {
      await playerApi.leave(payload).then(() => {
        router.push("/");
        deleteCookie("playerData");
        deleteCookie("lobbyData");
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
        deleteCookie("playerData");
        deleteCookie("lobbyData");
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
  };

  return { onLeave, onKick, onDelete, onStart };
};

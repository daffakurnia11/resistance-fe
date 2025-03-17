import { lobbyApi } from "@/services/apis/lobby-api";
import { loadingAtom, notifContent } from "@/utils/atom";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { setCookie } from "cookies-next";

export const useHostRoom = () => {
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [payload, setPayload] = React.useState({
    name: "",
  });
  const setNotif = useSetAtom(notifContent);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await lobbyApi.create(payload).then((res) => {
        setNotif({
          title: "Room created",
          message: "You have successfully created a room",
        });
        setCookie("lobbyData", res.data.lobby);
        setCookie("playerData", res.data.player);
        router.push(`/lobby?roomCode=${res.data.lobby.room_code}`);
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
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    payload,
    setPayload,
    handleSubmit,
  };
};

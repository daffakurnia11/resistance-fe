import { playerApi } from "@/services/apis/player-api";
import cookieStorage from "@/utils/cookies-storage";
import { loadingAtom, notifContent } from "@/utils/jotai/atom";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

export const useJoinRoom = () => {
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [payload, setPayload] = React.useState({
    name: "",
    room_code: "",
  });
  const setNotif = useSetAtom(notifContent);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await playerApi.join(payload).then((res) => {
        if (res.success) {
          setNotif({
            title: "Room joined",
            message: "You have successfully joined a room",
          });
          cookieStorage.save("lobbyData", res.data.lobby);
          cookieStorage.save("playerData", res.data.player);
          router.push(`/lobby?roomCode=${res.data.lobby.room_code}`);
        } else {
          setNotif({
            title: "Error",
            message: res.message,
          });
        }
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

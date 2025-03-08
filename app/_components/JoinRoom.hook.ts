import { lobbyApi } from "@/services/apis/lobby-api";
import cookieStorage from "@/utils/cookies-storage";
import { notifContent } from "@/utils/jotai/atom";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

export const useJoinRoom = () => {
  const [payload, setPayload] = React.useState({
    name: "",
    room_code: "",
  });
  const setNotif = useSetAtom(notifContent);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await lobbyApi.join(payload).then((res) => {
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
      setNotif({
        title: "Error",
        message: err.error.message[0],
      });
    }
  };

  return {
    payload,
    setPayload,
    handleSubmit,
  };
};

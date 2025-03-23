import { useMissionApi } from "@/services/swrs/use-mission";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const useWaitingRoom = () => {
  const { roomCode, id } = useParams();
  const router = useRouter();
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const { data, isLoading } = useMissionApi(id as string);
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true)
  }, []);
  
  useEffect(() => {
    if (data && !isLoading) {
      if (data.data.result) {
        router.push(`/lobby/${roomCode}/mission/${id}/result`);
      }
    }
  }, [data, isLoading]);

  return {
    isClient,
    player,
  };
};

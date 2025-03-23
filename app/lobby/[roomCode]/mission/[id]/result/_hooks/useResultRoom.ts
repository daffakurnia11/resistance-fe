import { useMissionApi } from "@/services/swrs/use-mission";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const useResultRoom = () => {
  const { roomCode, id } = useParams();
  const [countdown, setCountdown] = React.useState(4);
  const [afterCountdown, setAfterCountdown] = React.useState(10);
  const router = useRouter();
  const { data, isLoading } = useMissionApi(id as string);

  useEffect(() => {
    if (!isLoading && data && data.data.result) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isLoading && data && data.data.result && countdown === 0) {
      const timer = setInterval(() => {
        setAfterCountdown((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [data, isLoading, countdown]);

  useEffect(() => {
    if (!isLoading && data && data.data.result && afterCountdown === 0) {
      router.push(`/lobby/${roomCode}/mission`);
    }
  }, [data, isLoading, afterCountdown]);

  return { countdown, afterCountdown, data, isLoading, roomCode };
};

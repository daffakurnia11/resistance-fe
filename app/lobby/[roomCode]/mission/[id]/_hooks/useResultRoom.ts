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
    const timer = setInterval(() => {
      setCountdown((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      const timer = setInterval(() => {
        setAfterCountdown((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (afterCountdown === 0) {
      router.push(`/lobby/${roomCode}/mission`);
    }
  }, [afterCountdown]);

  return { countdown, afterCountdown, data, isLoading };
};

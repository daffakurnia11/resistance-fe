"use client";

import { useMissionRoom } from "../_hooks/useMissionRoom";
import PlayRoom from "./PlayRoom";
import ResultRoom from "./ResultRoom";
import WaitingRoom from "./WaitingRoom";

export default function MissionRoomPage() {
  const { data, isLoading, state } = useMissionRoom();

  if (data && !isLoading) {
    switch (state) {
      case "result":
        return <ResultRoom />;
      case "playing":
        return <PlayRoom />;
      default:
        return <WaitingRoom />;
    }
  }
}

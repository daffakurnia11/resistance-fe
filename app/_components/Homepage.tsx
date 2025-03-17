import * as React from "react";
import HostRoomCard from "./HostRoomCard";
import JoinRoomCard from "./JoinRoomCard";

export default function Homepage() {
  return (
    <div className="flex flex-col gap-4">
      <HostRoomCard />
      <JoinRoomCard />
    </div>
  );
}

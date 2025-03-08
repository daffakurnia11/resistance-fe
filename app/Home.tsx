import * as React from "react";
import HostRoomCard from "./_components/HostRoomCard";
import JoinRoomCard from "./_components/JoinRoomCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <HostRoomCard />
      <JoinRoomCard />
    </div>
  );
}

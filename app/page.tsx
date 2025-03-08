import * as React from "react";
import HostRoomCard from "./_components/HostRoomCard";
import JoinRoomCard from "./_components/JoinRoomCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host or Join Room - Resistance",
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <HostRoomCard />
      <JoinRoomCard />
    </div>
  );
}

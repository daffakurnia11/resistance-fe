import React from "react";
import MissionRoomPage from "./_components/MissionRoomPage";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  return {
    title: `Mission Room | Lobby ${params.roomCode} - The Resistance`,
  };
}

export default function MissinRoom() {
  return <MissionRoomPage />;
}

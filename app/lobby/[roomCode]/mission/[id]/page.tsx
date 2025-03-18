import React from "react";
import MissionRoomPage from "./_components/MissionRoomPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomCode: string }>;
}) {
  const resolvedParams = await params;
  return {
    title: `Mission Room | Lobby ${resolvedParams.roomCode} - The Resistance`,
  };
}

export default function MissinRoom() {
  return <MissionRoomPage />;
}

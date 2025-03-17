import React from "react";
import MissionPage from "./_components/MissionPage";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  return {
    title: `Mission Room | Lobby ${params.roomCode} - The Resistance`,
  };
}

export default function Mission() {
  return <MissionPage />;
}

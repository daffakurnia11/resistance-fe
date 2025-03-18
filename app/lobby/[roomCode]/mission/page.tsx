import React from "react";
import MissionPage from "./_components/MissionPage";

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

export default function Mission() {
  return <MissionPage />;
}

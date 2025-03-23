import React from "react";
import PlayRoom from "./_components/PlayRoom";

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
  return <PlayRoom />;
}

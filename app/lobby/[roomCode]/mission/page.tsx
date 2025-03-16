import React from "react";
import Mission from "./Mission";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  return {
    title: `Mission Room | Lobby ${params.roomCode} - The Resistance`,
  };
}

export default function MissionPage() {
  return <Mission />;
}

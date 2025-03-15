import React from "react";
import Reveal from "./Reveal";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  return {
    title: `Reveal | Lobby ${params.roomCode} - The Resistance`,
  };
}

export default function RevealPage() {
  return <Reveal />;
}

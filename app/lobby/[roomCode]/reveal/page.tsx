import React from "react";
import RevealPage from "./_components/RevealPage";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  return {
    title: `Reveal | Lobby ${params.roomCode} - The Resistance`,
  };
}

export default function Reveal() {
  return <RevealPage />;
}

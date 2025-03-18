import React from "react";
import RevealPage from "./_components/RevealPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomCode: string }>;
}) {
  const resolvedParams = await params;
  return {
    title: `Reveal | Lobby ${resolvedParams.roomCode} - The Resistance`,
  };
}

export default function Reveal() {
  return <RevealPage />;
}

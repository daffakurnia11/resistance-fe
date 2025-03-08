import { redirect } from "next/navigation";
import Lobby from "./Lobby";
import { cookies } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}): Promise<Metadata> {
  const roomCode = (await searchParams).roomCode;
  return {
    title: `Lobby ${roomCode} - The Resistance`,
  };
}

export default async function LobbyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const roomCode = (await searchParams).roomCode;
  const lobbyData = (await cookies()).get("lobbyData");

  if (!roomCode || !lobbyData) {
    redirect("/");
  }

  return <Lobby />;
}

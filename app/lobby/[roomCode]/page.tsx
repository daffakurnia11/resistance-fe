import LobbyPage from "./_components/LobbyPage";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  return {
    title: `Lobby ${params.roomCode} - The Resistance`,
  };
}

export default async function Lobby() {
  return <LobbyPage />;
}

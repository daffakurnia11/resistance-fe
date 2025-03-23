import LobbyPage from "./_components/LobbyPage";

type PageProps<T = object> = {
  params: T;
};

export async function generateMetadata({
  params,
}: PageProps<Promise<{ roomCode: string }>>) {
  const resolvedParams = await params;
  return {
    title: `Lobby ${resolvedParams.roomCode} - The Resistance`,
  };
}

export default async function Lobby() {
  return <LobbyPage />;
}

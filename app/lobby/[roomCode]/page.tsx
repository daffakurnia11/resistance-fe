import LobbyPage from "./_components/LobbyPage";

type PageProps<T = object> = {
  params: T;
};

export async function generateMetadata({
  params,
}: PageProps<{ roomCode: string }>) {
  return {
    title: `Lobby ${params.roomCode} - The Resistance`,
  };
}

export default async function Lobby() {
  return <LobbyPage />;
}

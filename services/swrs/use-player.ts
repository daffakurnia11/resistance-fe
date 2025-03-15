import useSWR from "swr";
import { playerApi } from "../apis/player-api";

export const usePlayerRevealApi = (lobbyId: string, playerId: string) => {
  const response = useSWR(
    `${playerApi.apiUrl}/reveal?lobby_id=${lobbyId}&player_id=${playerId}`,
    () => playerApi.reveal(lobbyId, playerId)
  );

  return response;
};

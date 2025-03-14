import useSWR from "swr";
import { lobbyApi } from "../apis/lobby-api";

export const useLobbyApi = (roomCode: string) => {
  const response = useSWR(`${lobbyApi.apiUrl}/${roomCode}`, () =>
    lobbyApi.get(roomCode)
  );

  return response;
};

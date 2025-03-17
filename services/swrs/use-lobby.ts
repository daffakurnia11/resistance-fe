import useSWR from "swr";
import { lobbyApi } from "../apis/lobby-api";

export const useLobbyApi = (roomCode: string) => {
  const response = useSWR(`${lobbyApi.apiUrl}/${roomCode}`, () =>
    lobbyApi.get(roomCode)
  );

  return response;
};

export const useLobbyPlayerApi = (roomCode: string) => {
  const response = useSWR(`${lobbyApi.apiUrl}/${roomCode}/player`, () =>
    lobbyApi.getPlayers(roomCode)
  );

  return response;
};

export const useLobbyMissionApi = (roomCode: string) => {
  const response = useSWR(`${lobbyApi.apiUrl}/${roomCode}/mission`, () =>
    lobbyApi.getMission(roomCode)
  );

  return response;
};

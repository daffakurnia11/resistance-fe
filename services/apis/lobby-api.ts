import { LobbyCreateData } from "@/types/Lobby";
import axios from "axios";

class LobbyApi {
  public apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/lobby`;

  async create(data: LobbyCreateData) {
    return axios
      .post(this.apiUrl, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async get(roomCode: string) {
    return axios
      .get(`${this.apiUrl}/${roomCode}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async delete(id: string) {
    return axios
      .delete(`${this.apiUrl}/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async getPlayers(roomCode: string) {
    return axios
      .get(`${this.apiUrl}/${roomCode}/player`)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async getMission(roomCode: string) {
    return axios
      .get(`${this.apiUrl}/${roomCode}/mission`)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async endGame(lobbyId: string, playerId: string) {
    return axios
      .post(`${this.apiUrl}/${lobbyId}/end`, { player_id: playerId })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}

export const lobbyApi = new LobbyApi();

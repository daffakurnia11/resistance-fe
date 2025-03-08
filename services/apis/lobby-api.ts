import { LobbyCreateData, LobbyJoinData, LobbyLeaveData } from "@/types/Lobby";
import axios from "axios";

class LobbyApi {
  public apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/lobbies`;

  async create(data: LobbyCreateData) {
    return axios
      .post(this.apiUrl, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async join(data: LobbyJoinData) {
    return axios
      .post(`${this.apiUrl}/join`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async getLobby(roomCode: string) {
    return axios
      .get(`${this.apiUrl}`, { params: { room_code: roomCode } })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async leaveLobby(data: LobbyLeaveData) {
    return axios
      .post(`${this.apiUrl}/leave`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}

export const lobbyApi = new LobbyApi();

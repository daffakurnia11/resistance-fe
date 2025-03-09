import { PlayerJoinPayload, PlayerLeavePayload } from "@/types/Player";
import axios from "axios";

class PlayerApi {
  public apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/player`;

  async join(data: PlayerJoinPayload) {
    return axios
      .post(`${this.apiUrl}/join`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async leave(data: PlayerLeavePayload) {
    return axios
      .post(`${this.apiUrl}/leave`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}

export const playerApi = new PlayerApi();

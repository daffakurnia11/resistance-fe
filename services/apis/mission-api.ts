import axios from "axios";

class MissionApi {
  public apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mission`;

  async start(lobbyId: string) {
    return axios
      .post(this.apiUrl, { lobby_id: lobbyId })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}

export const missionApi = new MissionApi();

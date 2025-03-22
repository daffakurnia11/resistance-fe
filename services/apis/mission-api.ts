import { MissionAssignPayload, MissionStartPayload, MissionVotePayload } from "@/types/Mission";
import axios from "axios";

class MissionApi {
  public apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mission`;

  async start(payload: MissionStartPayload) {
    return axios
      .post(this.apiUrl, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async assign(
    missionId: string,
    payload: MissionAssignPayload
  ) {
    return axios
      .post(`${this.apiUrl}/${missionId}/assign`, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  async vote(missionId: string, payload: MissionVotePayload) {
    return axios
      .post(`${this.apiUrl}/${missionId}/vote`, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}

export const missionApi = new MissionApi();

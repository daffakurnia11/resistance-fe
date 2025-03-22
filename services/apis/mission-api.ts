import { MissionStartPayload } from "@/types/Mission";
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
}

export const missionApi = new MissionApi();

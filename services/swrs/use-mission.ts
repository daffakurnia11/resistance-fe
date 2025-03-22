import useSWR from "swr";
import { missionApi } from "../apis/mission-api";

export const useMissionApi = (missionId: string) => {
  const response = useSWR(`${missionApi.apiUrl}/${missionId}`, () =>
    missionApi.get(missionId)
  );

  return response;
};

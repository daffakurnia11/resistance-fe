import { MissionResponseType } from "@/types/Mission";

export const useMissionResult = (mission: MissionResponseType) => {
  const getVoters = (vote: "APPROVE" | "REJECT") =>
    mission.mission_votes.filter((v) => v.vote === vote).map((v) => v.name);

  return { getVoters };
};

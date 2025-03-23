import { MissionResponseType, MissionVoteResponseType } from "@/types/Mission";

export const useMissionResult = (mission: MissionResponseType) => {
  const getVoters = (vote: "APPROVE" | "REJECT") =>
    mission.mission_votes
      .filter((v: MissionVoteResponseType) => v.vote === vote)
      .map((v: MissionVoteResponseType) => v.player.name);

  return { getVoters };
};

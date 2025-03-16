import { PlayerResponseData } from "./Player";

export interface MissionResponseType {
  id: number;
  name: string;
  result: "SUCCESS" | "FAIL";
  status: "OPEN" | "ASSIGNING" | "VOTING" | "IN_PLAY" | "CLOSED";
  leader: PlayerResponseData;
  mission_players: PlayerResponseData[];
  mission_votes: MissionVote[];
}

export interface MissionVote extends PlayerResponseData {
  player_id: number;
  name: string;
  vote: "APPROVE" | "REJECT";
}
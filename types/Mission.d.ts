import { PlayerResponseData } from "./Player";

export interface MissionStartPayload {
  lobby_id: string;
  player_id: string;
}

export interface MissionAssignPayload {
  leader_id: string;
  player_ids: string[];
}

export interface MissionResponseType {
  id: string;
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

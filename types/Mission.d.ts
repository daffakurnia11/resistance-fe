import { PlayerResponseData } from "./Player";

export interface MissionStartPayload {
  lobby_id: string;
  player_id: string;
}

export interface MissionAssignPayload {
  leader_id: string;
  player_ids: string[];
}

export interface MissionVotePayload {
  player_id: string;
  mission_players: string[];
  vote: "APPROVE" | "REJECT";
}

export interface MissionPlayPayload {
  player_id: string;
  state: "SUCCESS" | "FAIL";
}

export interface MissionPlayerResponseType {
  id: string;
  mission_id: string;
  player_id: string;
  player: PlayerResponseData;
  state: "SUCCESS" | "FAIL" | null;
}

export interface MissionVoteResponseType {
  id: string;
  mission_id: string;
  player_id: string;
  player: PlayerResponseData;
  vote: "APPROVE" | "REJECT";
}

export interface MissionResponseType {
  id: string;
  name: string;
  result: "SUCCESS" | "FAIL";
  status: "OPEN" | "ASSIGNING" | "VOTING" | "IN_PLAY" | "CLOSED";
  leader: PlayerResponseData;
  mission_players: MissionPlayerResponseType[];
  mission_votes: MissionVoteResponseType[];
}


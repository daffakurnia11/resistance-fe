export type PlayerJoinPayload = {
  name: string;
  room_code: string;
};

export type PlayerLeavePayload = {
  player_id: string;
  room_code: string;
};

export type PlayerResponseData = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  lobby_id: string;
  room_role: "MASTER" | "MEMBER";
  role?: "SPY" | "RESISTANCE" | null;
  teammate?: PlayerResponseData[];
};

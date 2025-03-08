export type LobbyCreateData = {
  name: string;
};

export type LobbyJoinData = {
  name: string;
  room_code: string;
};

export type LobbyResponseData = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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
};

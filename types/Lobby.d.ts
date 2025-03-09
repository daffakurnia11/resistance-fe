export type LobbyCreateData = {
  name: string;
};

export type LobbyResponseData = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  room_code: string;
};

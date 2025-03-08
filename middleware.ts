import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const lobbyData = cookies.get("lobbyData");

  if (lobbyData) {
    try {
      const lobby = JSON.parse(lobbyData.value);
      if (lobby.room_code) {
        return NextResponse.redirect(
          new URL(`/lobby?roomCode=${lobby.room_code}`, req.url)
        );
      }
    } catch (error) {
      console.error("Error parsing lobbyData:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/", 
};

import { NextRequest, NextResponse } from "next/server";
import { LobbyResponseData } from "./types/Lobby";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const PROTECTED_PATHS = ["/lobby"];
const PUBLIC_PATHS = ["/"];

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  const lobby: RequestCookie | undefined = req.cookies.get("lobbyData");
  const player: RequestCookie | undefined = req.cookies.get("playerData");

  if (isProtectedPath) {
    if (lobby && player) {
      try {
        const lobbyData: LobbyResponseData = JSON.parse(lobby.value);
        const match = pathname.match(/^\/lobby\/(\d+)/);
        const currentRoomCode = match ? match[1] : null;

        if (currentRoomCode === lobbyData.room_code) {
          return NextResponse.next();
        }

        return NextResponse.redirect(new URL(`/lobby/${lobbyData.room_code}`, req.url));
      } catch (error) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/lobby(.*)", "/"],
};

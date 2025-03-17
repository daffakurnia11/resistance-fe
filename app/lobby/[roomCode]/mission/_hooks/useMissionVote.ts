import { MissionResponseType } from "@/types/Mission";
import { modalAtom } from "@/utils/atom";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";

export const useMissionVote = (mission: MissionResponseType) => {
  const player = JSON.parse((getCookie("playerData") as string) || "{}");
  const [modal, setModal] = useAtom(modalAtom);

  const handleVote = (vote: "APPROVE" | "REJECT") => {
    console.log("POST /mission/{mission_id}/vote", "Payload:", {
      player_id: player.id,
      vote,
    });
    setModal({ ...modal, open: false });
  };

  return { handleVote };
}
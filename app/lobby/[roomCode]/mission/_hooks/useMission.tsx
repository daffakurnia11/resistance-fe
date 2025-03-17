import { MissionResponseType } from "@/types/Mission";
import { modalAtom } from "@/utils/atom";
import { useSetAtom } from "jotai";
import MissionAssignModal from "../_components/MissionAssignModal";
import MissionVoteModal from "../_components/MissionVoteModal";
import MissionResultModal from "../_components/MissionResultModal";
import fakeMission from "../fakeData.json";
import { useParams } from "next/navigation";

export const useMission = () => {
  const setModal = useSetAtom(modalAtom);
  const roomCode = useParams().roomCode;

  const openModal = (mission: MissionResponseType) => {
    setModal({
      open: true,
      header: mission.name,
      content:
        mission.status === "ASSIGNING" ? (
          <MissionAssignModal mission={mission} />
        ) : mission.status === "VOTING" ? (
          <MissionVoteModal mission={mission} />
        ) : (
          <MissionResultModal mission={mission} />
        ),
      footer: null,
    });
  };

  console.log(`GET /lobby/${roomCode}/mission`, fakeMission);

  return { fakeMission, openModal };
};

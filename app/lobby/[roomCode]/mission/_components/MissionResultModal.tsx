import Card from "@/components/card";
import Typography from "@/components/typography";
import {
  MissionPlayerResponseType,
  MissionResponseType,
} from "@/types/Mission";
import clsx from "clsx";
import React from "react";
import { useMissionResult } from "../_hooks/useMissionResult";

export default function MissionResultModal({
  mission,
}: {
  mission: MissionResponseType;
}) {
  const { getVoters } = useMissionResult(mission);

  return (
    <div className="flex flex-col gap-2">
      <Typography.Paragraph>
        <span className="text-green-primary">Leader :</span>{" "}
        <span className="text-green-white">{mission.leader.name}</span>
      </Typography.Paragraph>
      <Typography.Paragraph className="text-green-primary">
        Assigned to
      </Typography.Paragraph>
      {mission.mission_players.map(
        (missionPlayer: MissionPlayerResponseType, index) => (
          <Card.Base key={index}>
            <Typography.Paragraph>
              <span className="text-green-white">
                {missionPlayer.player.name}
              </span>
            </Typography.Paragraph>
          </Card.Base>
        )
      )}
      <div>
        <Typography.Paragraph className="text-green-primary">
          Approved by :
        </Typography.Paragraph>
        <Typography.Small className="text-action-green">
          {getVoters("APPROVE").join(", ")}
        </Typography.Small>
      </div>
      <div>
        <Typography.Paragraph className="text-green-primary">
          Reject by :
        </Typography.Paragraph>
        <Typography.Small
          className={clsx(getVoters("REJECT").length > 0 && "text-action-red")}
        >
          {getVoters("REJECT").length > 0
            ? getVoters("REJECT").join(", ")
            : "-"}
        </Typography.Small>
      </div>
      <Typography.Paragraph>
        <span className="text-green-primary">Result :</span>{" "}
        <span
          className={clsx(
            mission.result === "SUCCESS" && "text-action-green",
            mission.result === "FAIL" && "text-action-red"
          )}
        >
          {mission.result}
        </span>
      </Typography.Paragraph>
    </div>
  );
}

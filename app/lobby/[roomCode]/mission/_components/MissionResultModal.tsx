import Card from "@/components/card";
import Typography from "@/components/typography";
import { MissionResponseType } from "@/types/Mission";
import { PlayerResponseData } from "@/types/Player";
import clsx from "clsx";
import React from "react";

export default function MissionResultModal({
  mission,
}: {
  mission: MissionResponseType;
}) {
  const getVoters = (vote: "APPROVE" | "REJECT") =>
    mission.mission_votes.filter((v) => v.vote === vote).map((v) => v.name);

  return (
    <div className="flex flex-col gap-2">
      <Typography.Paragraph>
        <span className="text-green-primary">Leader :</span>{" "}
        <span className="text-green-white">{mission.leader.name}</span>
      </Typography.Paragraph>
      <Typography.Paragraph className="text-green-primary">
        Assigned to
      </Typography.Paragraph>
      {mission.mission_players.map((player: PlayerResponseData, index) => (
        <Card.Base key={index}>
          <Typography.Paragraph>
            <span className="text-green-white">{player.name}</span>
          </Typography.Paragraph>
        </Card.Base>
      ))}
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

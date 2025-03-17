import Button from "@/components/button";
import Card from "@/components/card";
import Typography from "@/components/typography";
import { MissionResponseType } from "@/types/Mission";
import { PlayerResponseData } from "@/types/Player";
import React from "react";
import { useMissionVote } from "../_hooks/useMissionVote";

export default function MissionVoteModal({
  mission,
}: {
  mission: MissionResponseType;
}) {
  const { handleVote } = useMissionVote(mission);

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
      <div className="flex items-center gap-3 mt-6">
        <Button.Action
          className="w-full"
          onClick={() => handleVote("APPROVE")}
          actionType="success"
        >
          Approve
        </Button.Action>
        <Button.Action
          className="w-full"
          onClick={() => handleVote("REJECT")}
          actionType="danger"
        >
          Reject
        </Button.Action>
      </div>
    </div>
  );
}

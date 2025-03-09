'use client';

import Card from "@/components/card";
import Typography from "@/components/typography";
import {
  ArrowLeftStartOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import React from "react";
import { useLobbyAction } from "./Lobby.hook";
import { PlayerResponseData } from "@/types/Player";

type PlayerCardProps = {
  playerData?: PlayerResponseData;
  playerNumber?: number;
  role?: "MASTER" | "MEMBER";
};

interface DefaultProps extends PlayerCardProps {
  state: "waiting" | "host" | "self" | "master" | "default";
}

const NoPlayerCard = () => {
  return (
    <Card className="h-20">
      <div className="px-5 flex justify-center items-center h-full">
        <Typography.Small className="text-green-primary">
          Waiting for other player..
        </Typography.Small>
      </div>
    </Card>
  );
};

const HostPlayerCard = ({ playerData, playerNumber }: PlayerCardProps) => {
  return (
    <Card className="h-20">
      <div className="px-5">
        <Typography.Paragraph>
          Player {playerNumber} (Host)
        </Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card>
  );
};

const SelfPlayerCard = ({ playerData, playerNumber }: PlayerCardProps) => {
  const { onLeave } = useLobbyAction();

  const LeaveComponent = (
    <button
      className="bg-green-primary rounded-full p-1.5 w-7 h-7 cursor-pointer"
      onClick={onLeave}
    >
      <ArrowLeftStartOnRectangleIcon className="size-4 text-light" />
    </button>
  );

  return (
    <Card className="h-20" action={LeaveComponent}>
      <div className="px-5">
        <Typography.Paragraph>Player {playerNumber} (You)</Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card>
  );
};

const MasterPlayerCard = ({ playerData, playerNumber }: PlayerCardProps) => {
  return (
    <Card className="h-20">
      <div className="px-5">
        <Typography.Paragraph>
          Player {playerNumber} (Host) (You)
        </Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card>
  );
};

const DefaultPlayerCard = ({ playerData, playerNumber, role }: PlayerCardProps) => {
  const { onKick } = useLobbyAction();
  
  const KickComponent = (
    <button className="bg-green-primary rounded-full p-1.5 w-7 h-7 cursor-pointer" onClick={() => onKick(playerData!.id)}>
      <XMarkIcon className="size-4 text-light" />
    </button>
  );

  return (
    <Card className="h-20" action={role === "MASTER" ? KickComponent : ""}>
      <div className="px-5">
        <Typography.Paragraph>Player {playerNumber}</Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card>
  );
};

export default function PlayerCard({ state, ...props }: DefaultProps) {
  switch (state) {
    case "waiting":
      return <NoPlayerCard />;
    case "host":
      return <HostPlayerCard {...props} />;
    case "self":
      return <SelfPlayerCard {...props} />;
    case "master":
      return <MasterPlayerCard {...props} />;
    default:
      return <DefaultPlayerCard {...props} />;
  }
}

"use client";

import Card from "@/components/card";
import Typography from "@/components/typography";
import {
  ArrowLeftStartOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import React from "react";
import { useLobbyAction } from "../_hooks/useLobbyAction";
import { PlayerResponseData } from "@/types/Player";
import Loading from "@/components/loading";

type PlayerCardProps = {
  playerData?: PlayerResponseData;
  playerNumber?: number;
  role?: "MASTER" | "MEMBER";
};

interface DefaultProps extends PlayerCardProps {
  state: "waiting" | "host" | "self" | "master" | "default" | "loading";
  isLoading?: boolean;
}

const NoPlayerCard = () => {
  return (
    <Card.Base className="h-20 w-full max-w-[325px]">
      <div className="px-5 flex justify-center items-center h-full">
        <Typography.Small className="text-green-primary">
          Waiting for other player..
        </Typography.Small>
      </div>
    </Card.Base>
  );
};

const HostPlayerCard = ({ playerData, playerNumber }: PlayerCardProps) => {
  return (
    <Card.Base className="h-20 w-full max-w-[325px]">
      <div className="px-5">
        <Typography.Paragraph>
          Player {playerNumber} (Host)
        </Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card.Base>
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
    <Card.Base className="h-20 w-full max-w-[325px]" action={LeaveComponent}>
      <div className="px-5">
        <Typography.Paragraph>Player {playerNumber} (You)</Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card.Base>
  );
};

const MasterPlayerCard = ({ playerData, playerNumber }: PlayerCardProps) => {
  return (
    <Card.Base className="h-20 w-full max-w-[325px]">
      <div className="px-5">
        <Typography.Paragraph>
          Player {playerNumber} (Host) (You)
        </Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card.Base>
  );
};

const DefaultPlayerCard = ({
  playerData,
  playerNumber,
  role,
}: PlayerCardProps) => {
  const { onKick } = useLobbyAction();

  const KickComponent = (
    <button
      className="bg-green-primary rounded-full p-1.5 w-7 h-7 cursor-pointer"
      onClick={() => onKick(playerData!.id)}
    >
      <XMarkIcon className="size-4 text-light" />
    </button>
  );

  return (
    <Card.Base
      className="h-20 w-full max-w-[325px]"
      action={role === "MASTER" ? KickComponent : ""}
    >
      <div className="px-5">
        <Typography.Paragraph>Player {playerNumber}</Typography.Paragraph>
        <Typography.Small className="text-green-secondary">
          {playerData!.name}
        </Typography.Small>
      </div>
    </Card.Base>
  );
};

const LoadingPlayerCard = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Card.Base className="h-20 w-full max-w-[325px]">
      <div className="px-5">
        <Loading
          className="w-3/4 h-[16px] mb-1.5 !ms-0 !me-auto"
          isLoading={isLoading}
        />
        <Loading
          className="w-1/2 h-[16px] !ms-0 !me-auto"
          isLoading={isLoading}
        />
      </div>
    </Card.Base>
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
    case "loading":
      return <LoadingPlayerCard isLoading={props.isLoading!} />;
    default:
      return <DefaultPlayerCard {...props} />;
  }
}

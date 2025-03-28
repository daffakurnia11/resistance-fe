"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Typography from "@/components/typography";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useJoinRoom } from "./JoinRoom.hook";

function JoinRoomCardContent() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");
  const { isLoading, payload, setPayload, handleSubmit } = useJoinRoom();

  return (
    <Card.Base className="w-[300px] mx-auto">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Typography.Heading as={"h1"} level={4}>
          Join Room
        </Typography.Heading>
        <Input
          placeholder="Your name"
          className="w-full my-4"
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          disabled={isLoading}
        />
        <Input
          defaultValue={room ?? ""}
          placeholder="Room number"
          className="w-full mb-4"
          onChange={(e) =>
            setPayload({ ...payload, room_code: e.target.value })
          }
          disabled={isLoading}
        />
        <Button.Primary
          className="w-full"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Join
        </Button.Primary>
      </div>
    </Card.Base>
  );
}

export default function JoinRoomCard() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <JoinRoomCardContent />
    </React.Suspense>
  );
}

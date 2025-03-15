"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Typography from "@/components/typography";
import * as React from "react";
import { useHostRoom } from "./HostRoom.hook";

export default function HostRoomCard() {
  const { isLoading, payload, setPayload, handleSubmit } = useHostRoom();

  return (
    <Card.Base className="w-[300px] mx-auto">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Typography.Heading as={"h1"} level={4}>
          Host Room
        </Typography.Heading>
        <Input
          placeholder="Your name"
          className="w-full my-4"
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          disabled={isLoading}
        />
        <Button.Primary
          className="w-full"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Create
        </Button.Primary>
      </div>
    </Card.Base>
  );
}

"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Typography from "@/components/typography";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export default function JoinRoomCard() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  return (
    <Card className="w-[300px] mx-auto">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Typography.Heading level={4}>Join Room</Typography.Heading>
        <Input placeholder="Your name" className="w-full my-4" />
        <Input
          defaultValue={room ?? ""}
          placeholder="Room number"
          className="w-full mb-4"
        />
        <Link href={"/lobby"} className="w-full">
          <Button.Primary className="w-full">Join</Button.Primary>
        </Link>
      </div>
    </Card>
  );
}

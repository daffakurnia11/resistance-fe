import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Typography from "@/components/typography";
import Link from "next/link";
import * as React from "react";

export default function HostRoomCard() {
  return (
    <Card className="w-[300px] mx-auto">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Typography.Heading level={4}>Host Room</Typography.Heading>
        <Input placeholder="Your name" className="w-full my-4" />
        <Link href={"/lobby"} className="w-full">
          <Button.Primary className="w-full">Create</Button.Primary>
        </Link>
      </div>
    </Card>
  );
}

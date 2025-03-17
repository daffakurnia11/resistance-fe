import Typography from "@/components/typography";
import fakeData from "../fakeData.json";
import React from "react";

export default function WaitingRoom() {
  return (
    <>
      <Typography.Heading
        as={"h1"}
        level={3}
        className="text-center text-green-secondary"
      >
        {fakeData.data.name}
      </Typography.Heading>
      <Typography.Heading
        as={"h2"}
        level={5}
        className="text-center text-green-primary mt-10"
      >
        Waiting for player to do their job...
      </Typography.Heading>
    </>
  );
}

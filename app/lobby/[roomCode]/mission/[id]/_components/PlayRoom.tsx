"use client";

import Typography from "@/components/typography";
import React from "react";
import fakeData from "../fakeData.json";
import Card from "@/components/card";
import Button from "@/components/button";
import clsx from "clsx";
import { useMissionRoom } from "./useMissionRoom";

export default function PlayRoom() {
  const { subtitle, handleResult, innerClassName, result, onSubmit } =
    useMissionRoom();

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
        className="text-center text-green-primary mt-1"
      >
        {subtitle()}
      </Typography.Heading>
      <div className="flex flex-col gap-4 mt-6">
        <Card.Base
          className="h-[150px]"
          innerClassName={innerClassName("SUCCESS")}
          onClick={() => handleResult("SUCCESS")}
        >
          <Typography.Paragraph
            className={clsx(
              "w-full h-full flex items-center justify-center",
              result && "text-white"
            )}
          >
            SUCCESS
          </Typography.Paragraph>
        </Card.Base>
        {fakeData.data.mission_players[0].role === "SPY" ? (
          <Card.Base
            className="h-[150px]"
            innerClassName={innerClassName("FAIL")}
            onClick={() => handleResult("FAIL")}
          >
            <Typography.Paragraph
              className={clsx(
                "w-full h-full flex items-center justify-center",
                result && "text-white"
              )}
            >
              FAIL
            </Typography.Paragraph>
          </Card.Base>
        ) : (
          <Card.Base
            className="h-[150px]"
            innerClassName={innerClassName("SUCCESS")}
            onClick={() => handleResult("SUCCESS")}
          >
            <Typography.Paragraph
              className={clsx(
                "w-full h-full flex items-center justify-center",
                result && "text-white"
              )}
            >
              SUCCESS
            </Typography.Paragraph>
          </Card.Base>
        )}
      </div>
      <Button.Primary
        className="mt-4 w-full"
        disabled={!Boolean(result)}
        onClick={onSubmit}
      >
        SEND
      </Button.Primary>
    </>
  );
}

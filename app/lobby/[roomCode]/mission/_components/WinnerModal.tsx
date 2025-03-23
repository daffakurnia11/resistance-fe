import Card from "@/components/card";
import Typography from "@/components/typography";
import clsx from "clsx";
import React from "react";

export default function WinnerModal({
  winner,
  resistanceList,
  spyList,
}: {
  winner: string;
  resistanceList: string[];
  spyList: string[];
}) {
  return (
    <>
      <Typography.Heading as={"h3"} level={5} className="text-center">
        Congratulations for the winner!
      </Typography.Heading>
      <Card.Base
        className="w-full h-[150px] mt-6"
        innerClassName={clsx(
          winner === "RESISTANCE" ? "!bg-action-green" : "!bg-action-red"
        )}
      >
        <div className="flex items-center justify-center h-full">
          <Typography.Heading
            as="h3"
            level={3}
            className="text-center !text-white"
          >
            {winner}
          </Typography.Heading>
        </div>
      </Card.Base>
      <div className="mt-4">
        <Typography.Paragraph className="text-green-primary">
          Resistance :
        </Typography.Paragraph>
        <Typography.Small className="text-action-green">
          {resistanceList.join(", ")}
        </Typography.Small>
      </div>
      <div className="mt-4">
        <Typography.Paragraph className="text-green-primary">
          Spy :
        </Typography.Paragraph>
        <Typography.Small className="text-action-red">
          {spyList.join(", ")}
        </Typography.Small>
      </div>
    </>
  );
}

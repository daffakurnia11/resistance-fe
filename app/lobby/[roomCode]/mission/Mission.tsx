"use client";

import Card from "@/components/card";
import Typography from "@/components/typography";
import clsx from "clsx";
import React from "react";
import fakeMission from "./fakeData.json";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { modalAtom } from "@/utils/jotai/atom";
import { MissionResponseType } from "@/types/Mission";
import MissionResultModal from "./_components/MissionResultModal";
import MissionAssignModal from "./_components/MissionAssignModal";
import MissionVoteModal from "./_components/MissionVoteModal";

export default function Mission() {
  const setModal = useSetAtom(modalAtom);

  const openModal = (mission: MissionResponseType) => {
    setModal({
      open: true,
      header: mission.name,
      content:
        mission.status === "ASSIGNING" ? (
          <MissionAssignModal mission={mission} />
        ) : mission.status === "VOTING" ? (
          <MissionVoteModal mission={mission} />
        ) : (
          <MissionResultModal mission={mission} />
        ),
      footer: null,
    });
  };

  console.log("GET /lobby/{lobby_id}/mission", fakeMission);
  return (
    <>
      <Typography.Heading
        as={"h1"}
        level={3}
        className="text-center text-green-secondary"
      >
        Mission
      </Typography.Heading>
      <Typography.Heading
        as={"h2"}
        level={5}
        className="text-center text-green-primary mt-1"
      >
        Be aware of spies among your team
      </Typography.Heading>
      <div className="flex justify-center flex-wrap mt-4">
        {(fakeMission.data as any).map(
          (mission: MissionResponseType, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-1/2 p-2"
              key={index}
            >
              <Card.Base
                className={clsx(
                  "h-full aspect-square relative",
                  mission.status === "OPEN"
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                )}
                onClick={() => mission.status !== "OPEN" && openModal(mission)}
              >
                <Typography.Paragraph className="text-center text-green-primary absolute top-3 left-1/2 transform -translate-x-1/2 text-nowrap">
                  {mission.name}
                </Typography.Paragraph>
                {mission.status !== "OPEN" && (
                  <Typography.Small className="text-center text-green-primary absolute bottom-3 left-1/2 transform -translate-x-1/2 text-nowrap">
                    Leader: {mission.leader.name}
                  </Typography.Small>
                )}
                <div className="h-full flex justify-center items-center">
                  {mission.result ? (
                    <Typography.Heading
                      as={"h3"}
                      level={3}
                      className={clsx(
                        "text-center text-nowrap",
                        mission.result === "SUCCESS"
                          ? "text-action-green"
                          : "text-action-red"
                      )}
                    >
                      {mission.result}
                    </Typography.Heading>
                  ) : (
                    <Typography.Heading
                      as={"h3"}
                      level={5}
                      className={clsx(
                        "text-center text-nowrap",
                        mission.status === "OPEN"
                          ? "text-green-primary"
                          : "text-green-secondary"
                      )}
                    >
                      {mission.status}
                    </Typography.Heading>
                  )}
                </div>
              </Card.Base>
            </motion.div>
          )
        )}
      </div>
    </>
  );
}

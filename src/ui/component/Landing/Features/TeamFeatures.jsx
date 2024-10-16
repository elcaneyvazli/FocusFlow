import React from "react";
import { motion } from "framer-motion";
import TeamFeaturesUserBadge from "./TeamFeaturesUserBadge";

export default function TeamFeatures() {
  return (
    <div className="h-full w-full bg-white dark:bg-primary rounded-main flex flex-col gap-16">
      <div className="flex flex-row items-center gap-8 p-16 border-b border-input-border dark:border-dark-input-border">
        <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-yellow-500"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-green-500"></div>
      </div>
      <div className="flex flex-row justify-between items-center px-16">
        <h1 className="text-primary dark:text-input-bg text-xl">Team List</h1>
        <motion.button
          className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-main py-8 px-32"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1 className="text-primary dark:text-input-bg text-sm">See All</h1>
        </motion.button>
      </div>
      <div className="flex flex-col gap-12 items-start justify-start px-16">
        <TeamFeaturesUserBadge name={"John Doe"} title={"Frontend Developer"} />
        <TeamFeaturesUserBadge
          name={"Alice Johnson"}
          title={"Software Engineer"}
        />
        <TeamFeaturesUserBadge name={"Charlie Davis"} title={"UX Designer"} />
        <TeamFeaturesUserBadge
          name={"Evan Miller"}
          title={"Marketing Specialist"}
        />
        <TeamFeaturesUserBadge name={"Fiona Wilson"} title={"Data Scientist"} />
        <TeamFeaturesUserBadge
          name={"Jane Doe"}
          title={"Human Resources Manager"}
        />
        <TeamFeaturesUserBadge
          name={"George Clark"}
          title={"Financial Analyst"}
        />
      </div>
    </div>
  );
}

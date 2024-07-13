import React from "react";
import { motion } from "framer-motion";
import Avvvatars from "avvvatars-react";

export default function TeamFeaturesUserBadge({ name, title }) {
  return (
    <motion.div
      className="flex flex-row md:gap-12 gap-4 items-center cursor-pointer w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="h-40 w-40 rounded-full">
        <Avvvatars value={name} border={false} size={40} style="shape" />
      </div>
      <div className="flex-col gap-0 flex">
        <p className="text-xs font-medium text-primary dark:text-input-bg">
          {name}
        </p>
        <p className="text-xs font-normal text-light">{title}</p>
      </div>
    </motion.div>
  );
}

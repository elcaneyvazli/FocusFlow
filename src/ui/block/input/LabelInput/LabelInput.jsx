import React from "react";
import { BookmarkIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import { motion } from "framer-motion";

export default function LabelInput({
  register,
  errors,
  labels,
  labelValue,
  setLabelValue,
  labelShow,
  setLabelShow,
}) {
  return (
    <div className="w-full relative">
      <div
        className="flex h-[40px] w-full items-center justify-between bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-8 py-4 rounded-main"
        onClick={() => setLabelShow(!labelShow)}
      >
        <div className="flex gap-4 items-center w-full">
          <BookmarkIcon className="w-[18px] h-[18px] text-light" />
          <TextInputWithoutBg
            title="Task Label"
            placeholder="Add Task label"
            text="md"
            color="primary"
            darkcolor="input-bg"
            register={register}
            registername="taskLabel"
            error={errors.taskLabel?.message}
            value={labelValue}
            onChange={(e) => setLabelValue(e.target.value)}
          />
        </div>
        <motion.div animate={{ rotate: labelShow ? 90 : 0 }}>
          <ChevronRightIcon className="w-[18px] h-[18px] text-light" />
        </motion.div>
      </div>
      {labelShow && labels.length > 0 && (
        <div className="absolute bottom-48 md:top-48 left-0 w-full bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-main z-50 min-h-[80px] h-fit">
          {labels?.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer text-sm text-primary dark:text-input-bg hover:bg-input-border dark:hover:bg-dark-input-border px-12 py-8"
              onClick={() => {
                setLabelValue(item);
                setLabelShow(false);
              }}
            >
              <p className="text-sm">{item.toLowerCase()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

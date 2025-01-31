"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  setToggleGroupDetail,
  setToggleProject,
} from "@/redux/features/GroupSlice/GroupSlice";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import { CircleArrowLeft, CirclePlus, ReceiptText, Search } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";

export default function GroupForm() {
  const dispath = useDispatch();
  const router = useRouter();
  const isMobile = useScreenWidth(768);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(),
  });
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center gap-12"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <div className="flex flex-row items-center gap-12 w-full">
        <Button
          type={"icon-base"}
          icon={<CircleArrowLeft size={16} className="text-text" />}
          onClick={() => router.back()}
          size="medium"
        />
        <Input
          icon={<Search size={16} className="text-text" />}
          placeholder={"Search group"}
          registername="groupSearch"
          error={errors.groupSearch?.message}
          register={register}
        />
        <Button
          text={isMobile ? "" : "Add new project"}
          icon={isMobile ? <CirclePlus size={16} className="text-text" /> : ""}
          type={isMobile ? "icon-primary" : "primary"}
          onClick={() => dispath(setToggleProject())}
        />
      </div>
      <div className="w-full sm:w-fit h-fit flex xl:hidden text-text">
        <Button
          type={"primary"}
          text={"Group Detail"}
          icon={<ReceiptText size={16} className="text-white" />}
          onClick={() => dispath(setToggleGroupDetail())}
          size="medium"
          width={"[100%]"}
        />
      </div>
    </motion.div>
  );
}

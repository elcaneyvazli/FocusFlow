"use client";
import { setToggleGroup } from "@/redux/features/GroupSlice/GroupSlice";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function GroupForm() {
  const dispath = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(),
  });

  return (
    <motion.div
      className="flex flex-row items-center gap-12"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <Input
        icon={<Search size={16} className="text-text" />}
        placeholder={"Search group"}
        registername="groupSearch"
        error={errors.groupSearch?.message}
        register={register}
      />
      <Button
        text="Add new group"
        type={"primary"}
        onClick={() => dispath(setToggleGroup())}
      />
    </motion.div>
  );
}

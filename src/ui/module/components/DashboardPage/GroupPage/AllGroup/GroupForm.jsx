"use client";
import { setToggleGroup } from "@/redux/features/GroupSlice/GroupSlice";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function GroupForm({ onSearch }) {
  const dispath = useDispatch();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      groupSearch: "",
    },
  });

  const searchValue = watch("groupSearch");

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue, onSearch]);

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
        register={register}
        error={errors.groupSearch?.message}
      />
      <Button
        text="Add new group"
        type={"primary"}
        onClick={() => dispath(setToggleGroup())}
      />
    </motion.div>
  );
}

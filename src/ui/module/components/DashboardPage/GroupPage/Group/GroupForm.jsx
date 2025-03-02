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
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import { useParams } from "next/navigation";
import { useUserRole } from "@/services/group.services";

export default function GroupForm({ onSearch }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useScreenWidth(768);
  const { id } = useParams();
  const { role, isLoading } = useUserRole(id);
  const isAdmin = role === "Admin";

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
          register={register}
          error={errors.groupSearch?.message}
        />
        <Button
          text={isMobile ? "" : "Add new project"}
          icon={isMobile ? <CirclePlus size={16} className="text-text" /> : ""}
          type={isMobile ? "icon-primary" : "primary"}
          onClick={() => !isLoading && isAdmin && dispatch(setToggleProject())}
          disabled={isLoading || !isAdmin}
        />
      </div>
      <div className="w-full sm:w-fit h-fit flex xl:hidden text-text">
        <Button
          type={"primary"}
          text={"Group Detail"}
          icon={<ReceiptText size={16} className="text-white" />}
          onClick={() => dispatch(setToggleGroupDetail())}
          size="medium"
          width={"[100%]"}
        />
      </div>
    </motion.div>
  );
}

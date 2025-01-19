"use client";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import PassInput from "@/ui/module/blocks/Input/PassInput";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schema/schema";
import { useDispatch } from "react-redux";
import { authLogin } from "@/redux/features/AuthSlice/AuthSlice";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      await dispatch(authLogin(data)).unwrap();
      router.push("/dashboard");

      dispatch(
        addToast({
          id: Date.now(),
          title: "Success",
          message: "Successfully logged in!",
          variant: "success",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        addToast({
          id: Date.now(),
          title: error.title || "Error",
          message: error.desc || "Login failed. Please try again.",
          variant: "error",
        })
      );
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  return (
    <motion.div
      className="flex flex-col gap-24 "
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <div className="flex flex-col gap-0 px-8 py-4 border-l-2 border-primary-600">
        <p className="text-text font-medium text-3xl">Welcome Back</p>
        <p className="text-light font-medium text-md">
          Please sign in to your account
        </p>
      </div>
      <form
        className="flex flex-col gap-16"
        onSubmit={handleSubmit(handleLogin)}
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
          title={"Email or username"}
          required="true"
          icon={<User size={16} className="text-text" />}
          placeholder={"Email or username"}
          registername="emailOrUsername"
          error={errors.emailOrUsername?.message}
          register={register}
        />
        <div className="flex flex-col gap-4 items-end">
          <PassInput
            registername="password"
            error={errors.password?.message}
            register={register}
            required={"true"}
          />
          <p className="text-text text-[10px] cursor-pointer font-medium">
            Forgot Password
          </p>
        </div>
        <div className="flex flex-col gap-4 items-start w-full">
          <Button text={"login"} width={"full"} type="base" />
          <p
            className="text-light text-xs cursor-pointer font-normal"
            onClick={() => {
              router.push("/register");
            }}
          >
            Don't have an account?
            <span className="text-text font-medium cursor-pointer">
              {" "}
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

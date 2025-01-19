"use client";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import PassInput from "@/ui/module/blocks/Input/PassInput";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/schema";
import { useDispatch } from "react-redux";
import { authRegister } from "@/redux/features/AuthSlice/AuthSlice";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    try {
      const response = await dispatch(authRegister(data)).unwrap();
      router.push("/login");
      dispatch(
        addToast({
          id: Date.now(),
          title: "Success",
          message: "Successfully registered!",
          variant: "success",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        addToast({
          id: Date.now(),
          title: error.title || "Error",
          message: error.desc || "Registration failed. Please try again.",
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
    resolver: yupResolver(RegisterSchema),
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
        <p className="text-text font-medium text-3xl">
          Welcome to our platform
        </p>
        <p className="text-light font-medium text-md">
          Please create an account to continue
        </p>
      </div>
      <form
        className="flex flex-col gap-16"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Input
          title="Email"
          required="true"
          icon={<Mail size={16} className="text-text" />}
          placeholder="Email address"
          registername="email"
          error={errors.email?.message}
          register={register}
        />
        <Input
          title="Username"
          required="true"
          icon={<User size={16} className="text-text" />}
          placeholder="Username"
          registername="userName"
          error={errors.userName?.message}
          register={register}
        />
        <div className="flex flex-col gap-4 items-end">
          <PassInput
            registername="password"
            error={errors.password?.message}
            register={register}
            required="true"
          />
        </div>
        <div className="flex flex-col gap-4 items-start w-full">
          <Button text="Register" width="full" type="base" />
          <p
            className="text-light text-xs cursor-pointer font-normal"
            onClick={() => router.push("/login")}
          >
            Already have an account?
            <span className="text-text font-medium cursor-pointer">
              {" "}
              Sign In
            </span>
          </p>
        </div>
      </form>{" "}
    </motion.div>
  );
}

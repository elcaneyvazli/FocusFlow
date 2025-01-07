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

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (data) => {
      try {
        await dispatch(authLogin(data));
        router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [router, dispatch]
  );

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  return (
    <form className="flex flex-col gap-16" onSubmit={handleSubmit(handleLogin)}>
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
          <span className="text-text font-medium cursor-pointer"> Sign Up</span>
        </p>
      </div>
    </form>
  );
}

"use client";
import React, { useState, useCallback } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schema/schema";
import dynamic from "next/dynamic";
import Skeleton from "@/ui/block/Sekeleton/Skeleton";

const Button = dynamic(() => import("@/ui/block/button/Button/Button"), {
  loading: () => <Skeleton className="w-full h-[40px]" />,
  ssr: false,
});
const AuthorizeButton = dynamic(
  () => import("@/ui/block/button/AuthorizeButton/AuthorizeButton"),
  {
    loading: () => <Skeleton className="w-full h-[40px]" />,
    ssr: false,
  }
);
const TextInput = dynamic(
  () => import("@/ui/block/input/TextInput/TextInput"),
  {
    loading: () => <Skeleton className="w-full h-[40px]" />,
    ssr: false,
  }
);
const PassInput = dynamic(
  () => import("@/ui/block/input/PassInput/PassInput"),
  {
    loading: () => <Skeleton className="w-full h-[40px]" />,
    ssr: false,
  }
);
const LogoContainer = dynamic(() => import("@/ui/block/Logo/Logo"), {
  loading: () => <Skeleton className="w-[40px] h-[40px]" />,
  ssr: false,
});

import { authLogin } from "@/redux/features/AuthSlice/AuthSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

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

  return (
    <div className="lg:px-16 lg:py-16 px-0 py-0 2xl:w-[37%] xl:w-[37%] lg:w-[50%] h-screen z-90 relative">
      <div className="bg-white dark:bg-primary h-full w-full items-start rounded-main flex flex-col sm:px-32 sm:py-32 xs:px-16 xs:py-16 px-12 py-12 gap-32 justify-between">
        <LogoContainer />
        <div className="flex flex-col gap-32 w-full">
          <div className="flex flex-col px-12 border-l-2 border-primary dark:border-input-bg">
            <h1 className="sm:text-3xl text-xl font-semibold text-primary dark:text-input-bg">Welcome Back</h1>
            <p className="sm:text-lg text-md text-light font-light">
              Please sign in to your account
            </p>
          </div>
          <form
            className="flex flex-col gap-16 w-full"
            onSubmit={handleSubmit(handleLogin)}
          >
            <TextInput
              title="Email or username:"
              placeholder="Email or Username"
              icon={<UserIcon className="w-[18px] h-[18px] text-light" />}
              registername="emailOrUsername"
              error={errors.emailOrUsername?.message}
              register={register}
            />
            <div className="flex flex-col gap-4 w-full items-end">
              <PassInput
                registername="password"
                error={errors.password?.message}
                register={register}
              />
              <button type="button">
                <h1 className="text-primary dark:text-input-bg font-bold text-xs">
                  Forgot Password
                </h1>
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full items-start">
              <Button text="Login" width={"full"} />
              <div className="flex flex-row gap-4">
                <h1 className="font-light text-xs text-light">
                  Don&apos;t have an account?
                </h1>
                <Link
                  className="text-primary dark:text-input-bg text-xs font-bold cursor-pointer"
                  href="/register"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row gap-12 items-center">
            <div className="w-full bg-primary dark:bg-input-bg h-[1px]"></div>
            <p className="text-primary dark:text-input-bg text-sm font-semibold">
              or
            </p>
            <div className="w-full bg-primary dark:bg-input-bg h-[1px]"></div>
          </div>
          <AuthorizeButton />
        </div>
      </div>
    </div>
  );
}

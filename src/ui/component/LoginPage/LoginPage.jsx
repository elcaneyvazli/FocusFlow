"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/ui/assert/Logo.svg";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AuthorizeButton from "@/ui/block/button/AuthorizeButton/AuthorizeButton";
import Button from "@/ui/block/button/Button/Button";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import PassInput from "@/ui/block/input/PassInput/PassInput";
import LogoContainer from "@/ui/block/Logo/Logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="lg:px-16 lg:py-16 px-0 py-0 2xl:w-[37%] xl:w-[37%] lg:w-[50%] h-screen z-90 relative">
      <div className="bg-white dark:bg-primary h-full w-full items-start rounded-main flex flex-col sm:px-32 sm:py-32 xs:px-16 xs:py-16 px-12 py-12 gap-32 justify-between">
        <LogoContainer />
        <div className="flex flex-col gap-32 w-full">
          <div className="fle flex-col px-12 border-l-2 border-primary dark:border-input-bg">
            <h1 className="sm:text-3xl text:xl font-semibold">Welcome Back</h1>
            <p className="sm:text-lg text-md text-light font-light">
              Please sign in to your account
            </p>
          </div>
          <div className="flex flex-col gap-16 w-full">
            <TextInput
              title={"Email or username:"}
              placeholder={"Email or Username"}
              icon={<UserIcon className="w-[18px] h-[18px] text-light" />}
            />
            <div className="flex flex-col gap-4 w-full items-end">
              <PassInput />
              <button>
                <h1 className="text-primary dark:text-input-bg font-bold text-xs">
                  Forgot Password
                </h1>
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full items-start">
              <Button text={"Login"} link={"/dashboard"} />
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
          </div>
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

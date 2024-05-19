"use client";
import React, { useState } from "react";
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AuthorizeButton from "@/ui/block/button/AuthorizeButton/AuthorizeButton";
import Button from "@/ui/block/button/Button/Button";
import LogoContainer from "@/ui/block/Logo/Logo";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import PassInput from "@/ui/block/input/PassInput/PassInput";
import { authRegister } from "@/services/auth/register.services";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authRegister(email, password, fullname);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:px-16 lg:py-16 px-0 py-0 2xl:w-[37%] xl:w-[37%] lg:w-[50%] h-screen z-90 relative">
      <div className="bg-white dark:bg-primary h-full w-full items-start rounded-main flex flex-col sm:px-32 sm:py-32 xs:px-16 xs:py-16 px-12 py-12 gap-32 justify-between">
        <LogoContainer />
        <div className="flex flex-col gap-32 w-full">
          <div className="fle flex-col px-12 border-l-2 border-primary dark:border-input-border">
            <h1 className="sm:text-3xl text:xl font-semibold">
              Welcome to our platform
            </h1>
            <p className="sm:text-lg text-md text-light font-light">
              Please create an account to continue
            </p>
          </div>
          <form
            className="flex flex-col gap-16 w-full"
            onSubmit={handleRegister}
          >
            <TextInput
              title={"Email:"}
              placeholder={"johndoe@gmail.com"}
              icon={<EnvelopeIcon className="w-[18px] h-[18px] text-light" />}
              value={email}
              change={(e) => setEmail(e.target.value)}
            />
            <TextInput
              title={"Username:"}
              placeholder={"John Doe"}
              icon={<UserIcon className="w-[18px] h-[18px] text-light" />}
              value={fullname}
              change={(e) => setFullname(e.target.value)}
            />
            <PassInput
              value={password}
              change={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-col gap-4 w-full items-start">
              <Button text={"Register"} />
              <div className="flex flex-row gap-4">
                <h1 className="font-light text-xs text-light">
                  Already have an account
                </h1>
                <Link
                  className="text-primary dark:text-input-bg text-xs font-bold cursor-pointer"
                  href="/login"
                >
                  Sign in
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

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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/schema";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const handleRegister = async (data) => {
    try {
      await authRegister(data.email, data.password, data.userName);
      router.push("/login");
    } catch (error) {
      setError("Register failed. Please check your credentials and try again.");
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
            onSubmit={handleSubmit(handleRegister)}
          >
            <TextInput
              title={"Email:"}
              placeholder={"johndoe@gmail.com"}
              icon={<EnvelopeIcon className="w-[18px] h-[18px] text-light" />}
              registername="email"
              error={errors.email?.message}
              register={register}
            />
            <TextInput
              title={"Username:"}
              placeholder={"John Doe"}
              icon={<UserIcon className="w-[18px] h-[18px] text-light" />}
              registername="userName"
              error={errors.userName?.message}
              register={register}
            />
            <PassInput
              registername="password"
              error={errors.password?.message}
              register={register}
            />
            {error && <div className="text-red-bg text-xs">{error}</div>}
            <div className="flex flex-col gap-4 w-full items-start">
              <Button text={"Register"} width={"full"}/>
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

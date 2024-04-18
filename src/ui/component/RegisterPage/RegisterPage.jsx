"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/ui/assert/Logowbg.svg";
import {
  UserIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import google from "@/ui/assert/google.png";
import Link from "next/link";
import PrimaryButton from "@/ui/block/button/primaryButton/primaryButton";
import AuthorizeButton from "@/ui/block/button/AuthorizeButton/AuthorizeButton";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="lg:px-16 lg:py-16 px-0 py-0 2xl:w-[37%] xl:w-[37%] lg:w-[50%] min-h-full z-90 relative">
      <div className="bg-white min-h-screen w-full items-start rounded-main flex flex-col sm:px-32 sm:py-32 xs:px-16 xs:py-16 px-12 py-12 gap-32 justify-between">
        <div className="flex flex-row gap-8 items-end">
          <div className="w-[40px] h-[40px]">
            <Image
              src={Logo}
              alt="logo"
              width={0}
              height={0}
              className="w-full h-full object-cover bg-center"
            />
          </div>
          <h1 className="text-xl text-black font-bold">FocusFlow</h1>
        </div>
        <div className="flex flex-col gap-32 w-full">
          <div className="fle flex-col px-12 border-l-2 border-primary">
            <h1 className="sm:text-3xl text:xl font-semibold">Welcome to our platform</h1>
            <p className=" sm:text-lg text-md text-light font-light">
              Please create an account to continue
            </p>
          </div>
          <div className="flex flex-col gap-16 w-full">
            <div className="flex flex-col gap-8 w-full">
              <h1 className="text-sm font-medium">Email:</h1>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
                  <EnvelopeIcon className="w-[18px] h-[18px] text-light" />
                </div>
                <input
                  type="text"
                  placeholder="johndoe@gmail.com"
                  className="bg-[#f9fafb] border border-[#D1D5DB] text-gray-900 text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12"
                />
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full">
              <h1 className="text-sm font-medium">Username:</h1>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
                  <UserIcon className="w-[18px] h-[18px] text-light" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="bg-[#f9fafb] border border-[#D1D5DB] text-gray-900 text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-end">
              <div className="flex flex-col gap-8 w-full">
                <h1 className="text-sm font-medium">Password:</h1>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
                    <ShieldCheckIcon className="w-[18px] h-[18px] text-[#9CA3AF]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="123456789"
                    className="bg-[#f9fafb] border border-[#D1D5DB] text-gray-900 text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12"
                  />
                  <button
                    className="absolute inset-y-0 end-0 flex items-center pe-16 z-50 pointer-events-auto"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon className="w-[18px] h-[18px] text-[#9CA3AF]" />
                    ) : (
                      <EyeSlashIcon className="w-[18px] h-[18px] text-[#9CA3AF]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-start">
              <PrimaryButton text="Sign up" link="/dashboard" />
              <div className="flex flex-row gap-4">
                <h1 className="font-light text-xs text-light">
                  Already have an account
                </h1>
                <Link
                  className="text-primary text-xs font-bold cursor-pointer"
                  href="/login"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row gap-12 items-center">
            <div className="w-full bg-primary h-[1px]"></div>
            <p className="text-primary text-sm font-semibold">or</p>
            <div className="w-full bg-primary h-[1px]"></div>
          </div>
          <AuthorizeButton />
        </div>
      </div>
    </div>
  );
}

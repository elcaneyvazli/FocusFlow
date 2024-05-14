"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/ui/assert/Logo.svg";
import Page from "@/ui/assert/page.png";
import About from "./About";
import Header from "@/ui/block/header/Header";
import Features from "./Features";
import Footer from "./Footer";
import FitButton from "@/ui/block/button/Button/FitButton";
import Sticker from "@/ui/assert/sticker.svg";
import DarkModeButton from "@/ui/block/button/DarkModeButton/DarkModeButton";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-32 items-start w-full dark:bg-primary">
      <div className="flex flex-col gap-32 items-start w-full px-16 sm:px-32 md:px-48 lg:px-64 xl:px-80">
        <div className="flex flex-row justify-between items-center w-full py-16">
          <div className="flex flex-row gap-8 items-center">
            <div className="w-[40px] h-[40px] z-50">
              <Image
                src={Logo}
                alt="logo"
                width={0}
                height={0}
                draggable="false"
                className="w-full h-full object-cover bg-center z-50"
              />
            </div>
            <h1 className="text-xl text-black dark:text-white font-semibold z-50">
              FocusFlow
            </h1>
          </div>
          <div className="hidden xs:flex flex-row gap-16 items-center">
            <FitButton text={"Login"} link={"/login"} />
            <FitButton text={"Register"} link={"/register"} />
            <DarkModeButton />
          </div>
        </div>
        <div className="flex flex-col gap-24 items-start">
          <div className="flex flex-col gap-0">
            <h1 className="font-bold text-black dark:text-white text-[48px] sm:text-[96px]">
              Win Your Day
            </h1>
            <p className="font-normal text-light text-sm sm:text-lg">
              Ditch the chaos, conquer your day. Focus Flow streamlines the
              Pomodoro Technique, turning to-do lists into trophies. Break down
              work, maximize focus, and crush procrastination. Sign up for early
              access and unlock peak productivity.
            </p>
          </div>
          <FitButton text={"Get Started"} link={"/register"} />
        </div>
        <div className="w-full border-8 border-black dark:border-dark-input-border rounded-main relative">
          <Image
            src={Page}
            alt="landing"
            width={0}
            height={0}
            draggable="false"
            className="w-full h-full object-cover bg-center rounded-[5px]"
          />
          <div className="hidden sm:flex absolute -top-80 -right-80">
            <Image
              src={Sticker}
              alt="landing"
              width={0}
              height={0}
              draggable="false"
              className="w-full h-full"
            />
          </div>
        </div>
        <Header text="About Focus Flow" />
        <About />
        <Header text="Platform Features" />
        <Features />
      </div>

      <Footer />
    </div>
  );
}

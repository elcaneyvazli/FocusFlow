"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/ui/assert/Logowbg.svg";
import Page from "@/ui/assert/page.png";
import { motion } from "framer-motion";
import About from "./About";
import Header from "@/ui/block/header/Header";
import Features from "./Features";
import Footer from "./Footer";
import FitButton from "@/ui/block/button/Button/FitButton";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-32 items-start w-full">
      <div className="flex flex-col gap-32 items-start w-full px-80">
        <div className="flex flex-row justify-between items-center w-full py-16">
          <div className="flex flex-row gap-8 items-end">
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
            <h1 className="text-xl text-black font-semibold z-50">FocusFlow</h1>
          </div>
          <div className="flex flex-row gap-16 items-center">
            <FitButton text={"Login"} link={"/login"} />
            <FitButton text={"Register"} link={"/register"} />
          </div>
        </div>
        <div className="flex flex-col gap-24 items-start">
          <div className="flex flex-col gap-0">
            <h1 className="font-bold text-black text-[96px]">Win Your Day</h1>
            <p className="font-normal text-light text-lg">
              Ditch the chaos, conquer your day. Focus Flow streamlines the
              Pomodoro Technique, turning to-do lists into trophies. Break down
              work, maximize focus, and crush procrastination. Sign up for early
              access and unlock peak productivity.
            </p>
          </div>
          <FitButton text={"Get Started"} link={"/register"} />
        </div>
        <motion.div className="w-full border-8 border-black rounded-main">
          <Image
            src={Page}
            alt="landing"
            width={0}
            height={0}
            draggable="false"
            className="w-full h-full object-cover bg-center rounded-main"
          />
        </motion.div>
        <Header text="About Focus Flow" />
        <About />
        <Header text="Platform Features" />
        <Features />
      </div>

      <Footer />
    </div>
  );
}

"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/ui/assert/Logo.svg";
import About from "./About";
import Header from "@/ui/block/header/Header";
import Features from "./Features/Features";
import Footer from "./Footer";
import FitButton from "@/ui/block/button/Button/FitButton";
import HeroSection from "./HeroSection";
import Button from "@/ui/block/button/Button/Button";
import DarkModeButton from "@/ui/block/button/DarkModeButton/DarkModeButton";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-32 items-start w-full dark:bg-primary">
      <div
        className="flex flex-col gap-32 items-start w-full px-16 sm:px-32 md:px-48 lg:px-64 xl:px-80"
        style={{
          perspective: "1000px",
        }}
      >
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
          <div className="flex flex-row gap-16 items-center">
            <DarkModeButton />
            <div className="hidden sm:flex flex-row gap-16 items-center">
              <FitButton text={"Login"} link={"/login"} />
              <FitButton text={"Register"} link={"/register"} />
            </div>
          </div>
        </div>
        <HeroSection />
        <Header text="About Focus Flow" />
        <About />
        <Header text="Platform Features" />
        <Features />
      </div>

      <Footer />
    </div>
  );
}

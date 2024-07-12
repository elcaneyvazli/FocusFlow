"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Page from "@/ui/assert/page.png";
import Sticker from "@/ui/assert/sticker.svg";
import Image from "next/image";
import Button from "@/ui/block/button/Button/Button";
import FitButton from "@/ui/block/button/Button/FitButton";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 0.2], [20, 0]);

  return (
    <div
      style={{
        perspective: "1000px",
      }}
      className="flex flex-col gap-32 relative"
    >
      <motion.div className="flex flex-col gap-16 overflow-hidden items-start justify-start">
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
      </motion.div>
      <motion.div
        className="w-full border-8 border-dark-input-border rounded-main relative"
        style={{
          rotateX: rotate,
        }}
      >
        <Image
          src={Page}
          alt="landing"
          width={0}
          height={0}
          draggable="false"
          className="w-full h-full object-cover bg-center rounded-[5px] overflow-hidden"
        />
        <div className="hidden xl:flex absolute -top-80 -right-80">
          <Image
            src={Sticker}
            alt="landing"
            width={0}
            height={0}
            draggable="false"
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  );
}

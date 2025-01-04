"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Page from "@/ui/assets/page.png";
import Sticker from "@/ui/assets/sticker.svg";
import Image from "next/image";
import Button from "../../blocks/Button/Button";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 0.2], [20, 0]);

  return (
    <div
      style={{
        perspective: "1000px",
      }}
      className="flex flex-col gap-24 relative"
    >
      <motion.div className="flex flex-col gap-16 items-start justify-start">
        <div className="flex flex-col gap-0">
          <h1 className="font-bold text-text text-[48px] md:text-[96px]">
            Win Your Day
          </h1>
          <p className="font-normal text-light text-sm md:text-lg">
            Ditch the chaos, conquer your day. Focus Flow streamlines the
            Pomodoro Technique, turning to-do lists into trophies. Break down
            work, maximize focus, and crush procrastination. Sign up for early
            access and unlock peak productivity.
          </p>
        </div>
        <Button text={"Get Started"} size={"medium"} type="primary" />
      </motion.div>
      <motion.div
        className="w-full border-4 border-border rounded-md relative"
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
          className="w-full h-full object-cover bg-center rounded-xs overflow-hidden"
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

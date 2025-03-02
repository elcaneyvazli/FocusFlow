"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Screen from "@/ui/assets/Screen.png";
import ScreenDark from "@/ui/assets/ScreenDark.png";
import Sticker from "@/ui/assets/sticker.svg";
import Image from "next/image";
import Button from "@/ui/module/blocks/Button/Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";

export default function HeroSection() {
  const DarkMode = useAppSelector((state) => state.darkMode.darkMode);

  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const router = useRouter();

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
        <Button
          text={"Get Started"}
          size={"medium"}
          type="primary"
          onClick={() => {
            router.push("/login");
          }}
        />
      </motion.div>
      <motion.div
        className="w-full border-4 border-border rounded-md relative"
        style={{
          rotateX: rotate,
        }}
      >
        <Image
          src={DarkMode ? ScreenDark : Screen}
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

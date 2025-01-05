"use client";
import Spline from "@splinetool/react-spline";
import { motion } from "motion/react";

export default function Bg() {
  return (
    <div className="h-[100%] w-full absolute top-0 bottom-0 right-0 left-0 hidden lg:block bg-white z-40">
      <Spline scene="https://prod.spline.design/AATno58HgLu96KZQ/scene.splinecode" />
      {/* <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-[#0000008e] bg-opacity-70 h-full w-full flex flex-col justify-end items-end p-32">
        <div className="w-[40%] xl:w-[50%] flex items-end justify-end h-full flex-col gap-8">
          <motion.h1
            className="text-lg text-white font-light text-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          ></motion.h1>
          <motion.div
            className="flex flex-row gap-8 items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div> 
      </div>*/}
    </div>
  );
}

//https://prod.spline.design/AATno58HgLu96KZQ/scene.splinecode

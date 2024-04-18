"use client";
import React from "react";
import Spline from "@splinetool/react-spline";

export default function Bg() {
  return (
    <div className="h-[100%] w-full absolute top-0 bottom-0 right-0 left-0 hidden lg:block">
      <Spline scene="https://prod.spline.design/AATno58HgLu96KZQ/scene.splinecode" />
    </div>
  );
}

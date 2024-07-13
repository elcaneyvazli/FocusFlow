"use client";
import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import { motion } from "framer-motion";

export default function Bg() {
  const [quote, setQuote] = useState({ author: "", text: "" });
  const cleanedAuthor = quote.author.replace(", type.fit", "").trim();
  const baseUrl = process.env.NEXT_PUBLIC_API_KEY_QUOTESS;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomQuote = response.data[randomIndex];
        setQuote({ author: randomQuote.author, text: randomQuote.text });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [baseUrl]);

  return (
    <div className="h-[100%] w-full absolute top-0 bottom-0 right-0 left-0 hidden lg:block bg-white">
      <Spline scene="https://prod.spline.design/AATno58HgLu96KZQ/scene.splinecode" />
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-[#0000008e] bg-opacity-70 h-full w-full flex flex-col justify-end items-end p-32">
        <div className="w-[40%] xl:w-[50%] flex items-end justify-end h-full flex-col gap-8">
          <motion.h1
            className="text-lg text-white font-light text-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {quote.text}
          </motion.h1>
          <motion.div
            className="flex flex-row gap-8 items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-2xl text-white font-bold text-end">
              {cleanedAuthor}
            </h1>
            {cleanedAuthor !== "" && (
              <span className="h-[1px] w-[30px] bg-white"></span>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

//https://prod.spline.design/AATno58HgLu96KZQ/scene.splinecode

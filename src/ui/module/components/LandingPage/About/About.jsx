"use client";
import React, { useState } from "react";
import Header from "../Header";
import AboutImg from "@/ui/assets/about.jpg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/redux/store";
import { Clock, Moon, Presentation, ShieldX, User, Users } from "lucide-react";

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  const DarkMode = useAppSelector((state) => state.darkMode.darkMode);

  const handleMouseMove = (e, index) => {
    if (hoveredCard === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100 + "%";
      const y = ((e.clientY - rect.top) / rect.height) * 100 + "%";
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const cards = [
    {
      icon: <Clock className="h-[24px] w-[24px] text-white" />,
      title: "Master Your Time",
      text: "Plan your schedule, break down tasks, and leverage the Pomodoro Technique to work in focused bursts.",
    },
    {
      icon: <Presentation className="h-[24px] w-[24px] text-white" />,
      title: "Unlock Data-Driven Insights",
      text: "Analyze your work patterns, pinpoint areas for improvement, and watch your productivity skyrocket.",
    },
    {
      icon: <Users className="h-[24px] w-[24px] text-white" />,
      title: "Ignite Your Focus Flame",
      text: "Join a supportive community, participate in friendly challenges, and stay motivated on your journey to peak performance.",
    },
    {
      icon: <ShieldX className="h-[24px] w-[24px] text-white" />,
      title: "Eliminate Distractions",
      text: "Block distractions, track your deep work sessions, and collaborate with a focus on accountability.",
    },
  ];
  return (
    <div className="flex flex-col gap-24">
      <Header text={"About Focus Flow"} />
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-16">
        <div className="col-span-2 lg:row-span-4 xl:row-span-2 lg:col-span-1">
          <Image
            src={AboutImg}
            alt="about"
            width={0}
            height={0}
            draggable="false"
            className="w-full h-full object-cover bg-center rounded-md"
          />
        </div>
        {cards.map((card, index) => {
          const isHovered = hoveredCard === index;
          return (
            <div
              key={index}
              className="card flex flex-col gap-16 items-start justify-between border border-border bg-elevation rounded-md p-16 col-span-2 sm:col-span-1 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: DarkMode
                        ? `radial-gradient(circle at ${mousePosition.x} ${mousePosition.y}, rgba(255,255,255,0.3) 0%, transparent 100%)`
                        : `radial-gradient(circle at ${mousePosition.x} ${mousePosition.y}, rgba(0,0,0,0.7) 0%, transparent 100%)`,
                      opacity: 1,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
              <div className="rounded-md p-8 bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white">
                {card.icon}
              </div>
              <div className="flex flex-col gap-0">
                <h1 className="text-text text-xl">{card.title}</h1>
                <p className="text-light text-md">{card.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

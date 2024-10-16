import React, { useState } from "react";
import AboutImg from "@/ui/assert/about.jpg";
import Image from "next/image";
import {
  ClockIcon,
  NoSymbolIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/redux/store";

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
      icon: <ClockIcon className="h-[30px] w-[30px] text-white" />,
      title: "Master Your Time",
      text: "Plan your schedule, break down tasks, and leverage the Pomodoro Technique to work in focused bursts.",
    },
    {
      icon: (
        <PresentationChartBarIcon className="h-[30px] w-[30px] text-white" />
      ),
      title: "Unlock Data-Driven Insights",
      text: "Analyze your work patterns, pinpoint areas for improvement, and watch your productivity skyrocket.",
    },
    {
      icon: <UserGroupIcon className="h-[30px] w-[30px] text-white" />,
      title: "Ignite Your Focus Flame",
      text: "Join a supportive community, participate in friendly challenges, and stay motivated on your journey to peak performance.",
    },
    {
      icon: <NoSymbolIcon className="h-[30px] w-[30px] text-white" />,
      title: "Eliminate Distractions",
      text: "Block distractions, track your deep work sessions, and collaborate with a focus on accountability.",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-16">
      <div className="col-span-2 lg:row-span-4 xl:row-span-2 lg:col-span-1">
        <Image
          src={AboutImg}
          alt="about"
          width={0}
          height={0}
          draggable="false"
          className="w-full h-full object-cover bg-center rounded-main"
        />
      </div>
      {cards.map((card, index) => {
        const isHovered = hoveredCard === index;
        return (
          <div
            key={index}
            className="card flex flex-col gap-16 items-start border border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg rounded-main p-16 col-span-2 sm:col-span-1 relative overflow-hidden cursor-pointer"
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
            <div className="rounded-main p-12 bg-primary text-white">
              {card.icon}
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="text-black dark:text-input-bg text-2xl">
                {card.title}
              </h1>
              <p className="text-light text-lg">{card.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

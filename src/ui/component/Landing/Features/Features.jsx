import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pomodoro from "@/ui/assert/pomodoro.svg";
import Calendar from "@/ui/assert/calendar.svg";
import Chart from "@/ui/assert/chart.svg";
import Team from "@/ui/assert/team.svg";
import Circle from "@/ui/assert/circle.svg";
import Pomodorodark from "@/ui/assert/pomodorodark.svg";
import Calendardark from "@/ui/assert/calendardark.svg";
import Chartdark from "@/ui/assert/chartdark.svg";
import Teamdark from "@/ui/assert/teamdark.svg";
import Circledark from "@/ui/assert/circledark.svg";
import { useSelector } from "react-redux";
import CalendarView from "@/ui/block/input/Dueto/CalendarView";
import dayjs from "dayjs";
import OnlyViewCalendar from "@/ui/block/input/Dueto/OnlyviewCalendar";
import GaugeChart from "./GaugeChart";
import CircularChart from "./CircularChart";
import CircleGaugeChart from "./CircleGaugeChart";
import TeamFeatures from "./TeamFeatures";

export default function Features() {
  const DarkMode = useSelector((state) => state.darkModeReducer).darkMode;

  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date) => {
    const selectedDayjsDate = dayjs(date);
    setSelectedDate(selectedDayjsDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className="grid grid-cols-12 gap-16 w-full h-full">
      <div className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-3 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-center relative overflow-hidden">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Pomodoro</h1>
          <p className="text-light text-lg">
            Keep track of the number of pomodoro
          </p>
        </div>
        <div className="absolute bottom-0">
          <GaugeChart />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col p-16 h-[270px] overflow-hidden">
        <div className="flex flex-col gap-0 w-full items-start justify-start h-fit">
          <h1 className="text-black dark:text-input-bg text-2xl">Calendar</h1>
          <p className="text-light text-lg">Keep track of you day</p>
        </div>
        <div className="w-full h-full relative">
          <div className="absolute top-0 right-0 w-full h-full">
            <OnlyViewCalendar
              today={today}
              setToday={setToday}
              selectedDate={selectedDate}
              setSelectedDate={handleDateSelect}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 row-span-2 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col justify-between p-16 items-end relative min-h-[450px]">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Team</h1>
          <p className="text-light text-lg">
            Create your team and share your data
          </p>
        </div>
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
            <TeamFeatures />
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col justify-between p-16 h-[270px] items-end relative overflow-hidden">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Tasks</h1>
          <p className="text-light text-lg">
            Keep track of the number of tasks
          </p>
        </div>
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg font-bold text-4xl">
            262
          </h1>
          <p className="text-light text-lg">from the last month</p>
        </div>
        <div className="absolute bottom-0 right-0 ">
          <CircleGaugeChart />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-3 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Statistics</h1>
          <p className="text-light text-lg">Keep track of your statistic</p>
        </div>
        <div className="absolute bottom-0 right-0 w-full">
          <Image
            src={Chart}
            alt="chart"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden w-full object-cover bg-center"
          />
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Pomodoro from "@/ui/assert/pomodoro.svg";
// import Calendar from "@/ui/assert/calendar.svg";
// import Chart from "@/ui/assert/chart.svg";
// import Team from "@/ui/assert/team.svg";
// import Circle from "@/ui/assert/circle.svg";
// import Pomodorodark from "@/ui/assert/pomodorodark.svg";
// import Calendardark from "@/ui/assert/calendardark.svg";
// import Chartdark from "@/ui/assert/chartdark.svg";
// import Teamdark from "@/ui/assert/teamdark.svg";
// import Circledark from "@/ui/assert/circledark.svg";
// import { useSelector } from "react-redux";
// import CalendarView from "@/ui/block/input/Dueto/CalendarView";
// import dayjs from "dayjs";

// export default function Features() {
//   const DarkMode = useSelector((state) => state.darkModeReducer).darkMode;

//   const [today, setToday] = useState(dayjs());
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);

//   const handleDateSelect = (date) => {
//     const selectedDayjsDate = dayjs(date);
//     setSelectedDate(selectedDayjsDate);
//     setIsCalendarOpen(false);
//   };

//   return (
//     <div className="grid grid-cols-12 gap-16 w-full h-full">
//       <div className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-3 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-center relative">
//         <div className="flex flex-col gap-0 w-full items-start justify-start">
//           <h1 className="text-black dark:text-input-bg text-2xl">Pomodoro</h1>
//           <p className="text-light text-lg">
//             Keep track of the number of pomodoro
//           </p>
//         </div>
//         <div className="absolute bottom-0">
//           <Image
//             src={DarkMode ? Pomodorodark : Pomodoro}
//             alt="pomodoro"
//             width={0}
//             height={0}
//             draggable="false"
//             className="overflow-hidden object-cover bg-center"
//           />
//         </div>
//       </div>
//       <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative">
//         <div className="flex flex-col gap-0 w-full items-start justify-start">
//           <h1 className="text-black dark:text-input-bg text-2xl">Calendar</h1>
//           <p className="text-light text-lg">Keep track of your day</p>
//         </div>
//         <div className="absolute bottom-0 right-0">
//           <button
//             onClick={() => setIsCalendarOpen(!isCalendarOpen)}
//             className="text-primary underline"
//           >
//             {isCalendarOpen ? "Close Calendar" : "Open Calendar"}
//           </button>
//         </div>
//         {isCalendarOpen && (
//           <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-dark-background z-50">
//             <CalendarView
//               today={today}
//               setToday={setToday}
//               selectedDate={selectedDate}
//               setSelectedDate={handleDateSelect}
//             />
//           </div>
//         )}
//       </div>
//       <div className="col-span-4 row-span-2 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main hidden xl:flex flex-col justify-between p-16 items-end relative">
//         <div className="flex flex-col gap-0 w-full items-start justify-start">
//           <h1 className="text-black dark:text-input-bg text-2xl">Team</h1>
//           <p className="text-light text-lg">
//             Create your team and share your data
//           </p>
//         </div>
//         <div className="w-full h-full relative overflow-hidden">
//           <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
//             <Image
//               src={DarkMode ? Teamdark : Team}
//               alt="team"
//               width={0}
//               height={0}
//               draggable="false"
//               className="overflow-hidden w-full object-cover bg-center"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col justify-between p-16 h-[270px] items-end relative">
//         <div className="flex flex-col gap-0 w-full items-start justify-start">
//           <h1 className="text-black dark:text-input-bg text-2xl">Tasks</h1>
//           <p className="text-light text-lg">
//             Keep track of the number of tasks
//           </p>
//         </div>
//         <div className="flex flex-col gap-0 w-full items-start justify-start">
//           <h1 className="text-black dark:text-input-bg font-bold text-4xl">
//             262
//           </h1>
//           <p className="text-light text-lg">from the last month</p>
//         </div>
//         <div className="absolute bottom-12 right-12">
//           <Image
//             src={DarkMode ? Circledark : Circle}
//             alt="circle"
//             width={0}
//             height={0}
//             draggable="false"
//             className="overflow-hidden object-cover bg-center"
//           />
//         </div>
//       </div>
//       <div className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-3 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative">
//         <div className="flex flex-col gap-0 w-full items-start justify-start">
//           <h1 className="text-black dark:text-input-bg text-2xl">Statistics</h1>
//           <p className="text-light text-lg">Keep track of your statistic</p>
//         </div>
//         <div className="absolute bottom-0 right-0 w-full">
//           <Image
//             src={Chart}
//             alt="chart"
//             width={0}
//             height={0}
//             draggable="false"
//             className="overflow-hidden w-full object-cover bg-center"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

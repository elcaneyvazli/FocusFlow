// import { PresentationChartLineIcon } from "@heroicons/react/24/outline";
// import chartData from "@/library/chartdata";
// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   // YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     console.log(payload);
//     return (
//       <div className="custom-tooltip">
//         <div
//           className={`flex flex-row items-center gap-8 border border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg px-8 py-4 rounded-[5px] shadow-lg`}
//         >
//           <div className="min-w-[5px] w-[6px] h-[30px] min-h-full bg-blue-primary rounded-main"></div>
//           <div className="flex flex-col gap-0 items-start">
//             <h1 className="text-xs text-primary dark:text-input-bg">
//               Session time
//             </h1>
//             <div className="flex flex-row items-center gap-8">
//               <p className="text-xs font-medium text-light">
//                 {new Date(label).toLocaleDateString("en-UK", {
//                   month: "short",
//                   day: "numeric",
//                 })}
//                 :
//               </p>
//               <p className="text-xs text-light">{payload[0].value} minutes</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

// export default function LineChartContainer() {
//   return (
//     <div className="h-[500px] w-full bg-white border border-input-border dark:bg-dark-input-bg dark:border-dark-input-border rounded-main flex flex-col gap-16 p-16">
//       <div className="flex flex-row justify-between items-center">
//         <div className="flex flex-row items-center gap-12">
//           <div className="p-8 bg-blue-light border border-blue-primary rounded-main">
//             <PresentationChartLineIcon className="h-24 w-24 text-blue-primary" />
//           </div>
//           <div className="flex flex-col gap-0">
//             <h1 className="text-xl font-medium text-black dark:text-white">
//               Pomodoro session time
//             </h1>
//             <p className="text-md font-normal text-light">
//               Showing total spent time for the last 3 months
//             </p>
//           </div>
//         </div>
//         <div className="w-[50%]">
//           <CustomSelect
//             options={["Last 7 days", "Last 30 days", "Last 90 days"]}
//             defaultValue={0}
//             onChange={(value) => console.log(value)}
//             variant="primary"
//           />
//         </div>
//       </div>
//       <div className="w-full h-full">
//         <ResponsiveContainer>
//           <AreaChart data={chartData}>
//             <defs>
//               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#037ef3" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#037ef3" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid
//               vertical={false}
//               stroke="#2D2D2D"
//               strokeOpacity={0.5}
//               strokeDasharray="5 5"
//             />

//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               minTickGap={32}
//               tickFormatter={(value) => {
//                 const date = new Date(value);
//                 return date.toLocaleDateString("en-UK", {
//                   month: "short",
//                   day: "numeric",
//                 });
//               }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Area
//               type="monotone"
//               dataKey="desktop"
//               stroke="#037ef3"
//               fillOpacity={1}
//               fill="url(#colorUv)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


import React, { useState, useMemo } from "react";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";
import chartData from "@/library/chartdata";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className={`flex flex-row items-center gap-8 border border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg px-8 py-4 rounded-[5px] shadow-lg`}>
          <div className="min-w-[5px] w-[6px] h-[30px] min-h-full bg-blue-primary rounded-main"></div>
          <div className="flex flex-col gap-0 items-start">
            <h1 className="text-xs text-primary dark:text-input-bg">Session time</h1>
            <div className="flex flex-row items-center gap-8">
              <p className="text-xs font-medium text-light">
                {new Date(label).toLocaleDateString("en-UK", { month: "short", day: "numeric" })}:
              </p>
              <p className="text-xs text-light">{payload[0].value} minutes</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const rangeOptions = ["Last 7 days", "Last 30 days", "Last 90 days"];

export default function LineChartContainer() {
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(2); // Default to "Last 90 days"

  const filteredData = useMemo(() => {
    const now = new Date();
    let daysToShow = 90;

    switch (selectedRangeIndex) {
      case 0:
        daysToShow = 7;
        break;
      case 1:
        daysToShow = 30;
        break;
      default:
        daysToShow = 90;
    }

    const startDate = new Date(now.getTime() - daysToShow * 24 * 60 * 60 * 1000);
    return chartData.filter(item => new Date(item.date) >= startDate);
  }, [selectedRangeIndex]);

  const handleRangeChange = (index) => {
    setSelectedRangeIndex(index);
  };

  return (
    <div className="h-[500px] w-full bg-white border border-input-border dark:bg-dark-input-bg dark:border-dark-input-border rounded-main flex flex-col gap-16 p-16">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-12">
          <div className="p-8 bg-blue-light border border-blue-primary rounded-main">
            <PresentationChartLineIcon className="h-24 w-24 text-blue-primary" />
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="text-xl font-medium text-black dark:text-white">Pomodoro session time</h1>
            <p className="text-md font-normal text-light">Showing total spent time for the {rangeOptions[selectedRangeIndex].toLowerCase()}</p>
          </div>
        </div>
        <div className="w-[50%]">
          <CustomSelect
            options={rangeOptions}
            defaultValue={1}
            onChange={handleRangeChange}
            variant="primary"
          />
        </div>
      </div>
      <div className="w-full h-full">
        <ResponsiveContainer>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#037ef3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#037ef3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#2D2D2D" strokeOpacity={0.5} strokeDasharray="5 5" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-UK", { month: "short", day: "numeric" });
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="desktop" stroke="#037ef3" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
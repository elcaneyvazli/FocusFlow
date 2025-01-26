"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div
          className={`flex flex-row items-center gap-8 border border-border bg-elevation px-8 py-4 rounded-[5px] shadow-lg`}
        >
          <div className="min-w-[5px] w-[6px] h-[30px] min-h-full bg-primary-600 rounded-md"></div>
          <div className="flex flex-col gap-0 items-start">
            <h1 className="text-xs text-text">Session time</h1>
            <div className="flex flex-row items-center gap-8">
              <p className="text-xs font-medium text-light">
                {new Date(label).toLocaleDateString("en-UK", {
                  month: "short",
                  day: "numeric",
                })}
                :
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

export default function LineChart({ chartData }) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#037ef3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#037ef3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="#2D2D2D"
            strokeOpacity={0.5}
            strokeDasharray="5 5"
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-UK", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="desktop"
            stroke="#037ef3"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

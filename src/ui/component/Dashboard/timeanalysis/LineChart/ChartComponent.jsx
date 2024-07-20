import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 56 },
  { month: "August", desktop: 267 },
  { month: "September", desktop: 98 },
  { month: "October", desktop: 33 },
  { month: "November", desktop: 145 },
  { month: "December", desktop: 98 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#184bfe",
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-8 bg-input-bg dark:bg-primary border border-input-border dark:border-dark-input-border rounded shadow-lg">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ChartComponent = () => {
  return (
    <div className="w-full p-12 flex flex-col gap-16 bg-white dark:bg-dark-input-bg shadow-md rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Task Complete Analysis of year</h2>
        <p className="text-light">January - December 2024</p>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ right: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              interval={0}
              padding={{ left: 20, right: 20 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="natural"
              dataKey="desktop"
              stroke={chartConfig.desktop.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;

import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const chartData = [
  { month: "Mon", desktop: 186 },
  { month: "Tue", desktop: 305 },
  { month: "Wed", desktop: 237 },
  { month: "Thu", desktop: 73 },
  { month: "Fri", desktop: 209 },
  { month: "Sat", desktop: 214 },
  { month: "Sun", desktop: 56 },
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

const BarChartUi = () => {
  return (
    <div className="w-full p-12 flex flex-col gap-16 bg-white dark:bg-dark-input-bg shadow-md rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Task Complete Analysis of Week</h2>
        <p className="text-light">Mon - Sun</p>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ right: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              interval={0}
              padding={{ left: 20, right: 20 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="desktop"
              fill={"#76D0EB"}
              stroke={"#76D0EB"}
              strokeWidth={2}
              radius={[10, 10, 0, 0]}
              cursor="pointer"
              background={{ fill: "transparent" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartUi;

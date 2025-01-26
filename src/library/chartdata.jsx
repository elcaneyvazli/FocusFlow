import dayjs from "dayjs";

const generateChartData = (days) => {
  const chartData = [];
  for (let i = days - 1; i >= 0; i--) {
    chartData.push({
      date: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
      desktop: Math.floor(Math.random() * 100),
    });
  }
  return chartData;
};

const chartData = generateChartData(90);

export default chartData;

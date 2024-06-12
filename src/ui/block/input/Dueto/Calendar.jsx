import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateofMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateofMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  for (let i = 0; i < firstDateofMonth.day(); i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: firstDateofMonth.subtract(firstDateofMonth.day() - i, "day"),
    });
  }

  for (let i = firstDateofMonth.date(); i <= lastDateofMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateofMonth.date(i),
      today: firstDateofMonth.date(i).isSame(dayjs(), "day"),
    });
  }

  const remaining = 42 - arrayOfDate.length;
  for (let i = 1; i <= remaining; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateofMonth.add(i, "day"),
    });
  }

  return arrayOfDate;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

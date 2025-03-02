import axios from "axios";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useActivity = () => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/api/Analysis/user-activity`,
    fetcher,
    {}
  );

  return {
    activities: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

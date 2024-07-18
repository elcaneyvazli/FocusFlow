import { useEffect, useState } from "react";

const useDarkTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === "dark";
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDarkScheme;
    }
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = prefersDarkScheme ? "dark" : "light";
      localStorage.setItem("theme", initialTheme);
      setIsDark(prefersDarkScheme);
    }

    const handleChange = (e) => {
      setIsDark(e.matches);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prevIsDark) => {
      const newTheme = !prevIsDark ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", !prevIsDark);
      return !prevIsDark;
    });
  };

  return [isDark, toggleTheme];
};

export default useDarkTheme;

import { useState } from "react";

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const bind = {
    onMouseEnter,
    onMouseLeave,
  };

  return [isHovered, bind];
};

export default useHover;

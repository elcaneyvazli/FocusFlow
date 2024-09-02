import { useState, useEffect } from 'react';

function useScreenWidth(maxWidth) {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsScreenSmall(window.innerWidth <= maxWidth);
    };

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);

    return () => window.removeEventListener('resize', checkScreenWidth);
  }, [maxWidth]);

  return isScreenSmall;
}

export default useScreenWidth;

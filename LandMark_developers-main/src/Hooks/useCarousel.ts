import { useEffect, useState } from "react";

const useCarousel = (length: number, delay: number = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === length - 1 ? 0 : prev + 1
      );
    }, delay);

    return () => clearInterval(interval);
  }, [length, delay]);

  return currentIndex;
};

export default useCarousel;
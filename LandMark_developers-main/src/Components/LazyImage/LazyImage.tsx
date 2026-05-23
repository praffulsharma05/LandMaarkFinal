import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { isLoaded, markLoaded } from "../../utils/imageLoadTracker";
import "./LazyImage.css";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
}) => {
  const [loaded, setLoaded] = useState(() => isLoaded(src));

  const handleAfterLoad = () => {
    markLoaded(src);
    setLoaded(true);
  };

  return (
    <div className={`lazy-img-wrapper ${wrapperClassName}`}>
      <LazyLoadImage
        src={src}
        alt={alt}
        className={`lazy-img ${loaded ? "lazy-img--loaded" : ""} ${className}`}
        wrapperClassName="lazy-lib-wrapper"
        effect={loaded ? undefined : "blur"}
        afterLoad={handleAfterLoad}
      />
    </div>
  );
};

export default LazyImage;

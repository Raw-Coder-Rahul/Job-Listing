import React, { useRef, useEffect } from "react";

const Carousel = ({
  items,
  renderItem,
  autoSlide = true,
  interval = 400,
}) => {
  const carouselRef = useRef(null);

  const scrollNext = () => {
    const slider = carouselRef.current;
    if (!slider) return;

    const firstItem = slider.querySelector(".carousel-item");
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth + 24;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!autoSlide) return;

    const auto = setInterval(() => {
      scrollNext();
    }, interval);

    return () => clearInterval(auto);
  }, [interval, autoSlide]);

  return (
    <div className="w-full">
      <div
        ref={carouselRef}
        className="flex gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory px-8"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-item snap-center flex-shrink-0"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
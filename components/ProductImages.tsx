import React, { useEffect, useRef, useState } from "react";

const ProductImages = ({
  name,
  images,
}: {
  name?: string;
  images?: string[];
}) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const activeStyling = "border-primary";

  const slideRef = useRef<HTMLDivElement>(null);
  // const [width, setWidth] = useState(0);
  // const [start, setStart] = useState(0);
  // const [change, setChange] = useState(0);

  // useEffect(() => {
  //   if (!slideRef.current) return;
  //   const scrollWidth = slideRef.current.scrollWidth;
  //   const childElementCount = slideRef.current.childElementCount;
  //   setWidth(scrollWidth / childElementCount);
  // }, []);

  // function onDragStart(e) {
  //   setStart(e.clientY);
  // }

  // function onDragOver(e) {
  //   setChange(start - e.clientY);
  // }

  // function onDragEnd(e) {
  //   if (!slideRef.current) return;
  //   if (change > 0) {
  //     slideRef.current.scrollTop += 128;
  //   } else if (change < 0) {
  //     slideRef.current.scrollTop -= 128;
  //   }
  // }

  return (
    <div className="flex flex-col lg:gap-20 gap-10 max-lg:order-2 items-center">
      <div className="h-[300px] flex items-center justify-center">
        <img
          src={activeImage}
          alt={name + " image"}
          title={name}
          className="h-full"
        />
      </div>
      <div className="lg:w-[500px] sm:w-[350px] w-full flex items-center justify-center gap-2">
        <button
          className=""
          onClick={() => {
            if (!slideRef.current) return;
            slideRef.current.scrollLeft -= 64;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div
          className="flex gap-4 w-[500px] scrollable"
          ref={slideRef}
          // draggable={true}
          // onDragStart={onDragStart}
          // onDragOver={onDragOver}
          // onDragEnd={onDragEnd}
        >
          {images?.map((img) => (
            <div
              key={img}
              className={`min-w-[100px] max-w-[100px] h-[100px] p-2 rounded-lg flex justify-center items-center border-2 border-gray-200 cursor-pointer ${
                img === activeImage && activeStyling
              }`}
              onClick={() => setActiveImage(img)}
            >
              <img
                className="pointer-events-none h-max w-max"
                src={img}
                alt={name + " image"}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            if (!slideRef.current) return;
            slideRef.current.scrollLeft += 64;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductImages;

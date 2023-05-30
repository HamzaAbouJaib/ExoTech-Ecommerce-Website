import React, { useEffect, useRef, useState } from "react";

const ProductImages = ({
  name,
  images,
}: {
  name?: string;
  images?: string[];
}) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const activeStyling = "bg-gray-200/70";

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
    <div className="flex items-center gap-10">
      <div className="h-[500px] flex flex-col items-center justify-center gap-2">
        <button
          className=""
          onClick={() => {
            if (!slideRef.current) return;
            slideRef.current.scrollTop -= 64;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <div
          className="flex flex-col items-center gap-4 h-max scrollable"
          ref={slideRef}
          // draggable={true}
          // onDragStart={onDragStart}
          // onDragOver={onDragOver}
          // onDragEnd={onDragEnd}
        >
          {images?.map((img) => (
            <div
              key={img}
              className={`w-[100px] p-3 rounded-lg flex justify-center border border-gray-200 cursor-pointer ${
                img === activeImage && activeStyling
              }`}
              onClick={() => setActiveImage(img)}
            >
              <img
                className="pointer-events-none"
                src={img}
                alt={name + " image"}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            if (!slideRef.current) return;
            slideRef.current.scrollTop += 64;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <div className="w-[500px] h-[500px] p-5 flex items-center">
        <img className="" src={activeImage} alt={name + " image"} />
      </div>
    </div>
  );
};

export default ProductImages;

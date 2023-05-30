import { useState } from "react";

const ProductImages = ({
  name,
  images,
}: {
  name?: string;
  images?: string[];
}) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const activeStyling = "bg-gray-200/70";
  return (
    <div className="flex items-center gap-10">
      <div className="flex flex-col gap-4 h-[500px] justify-center scrollable">
        {images?.map((img) => (
          <div
            key={img}
            className={`w-32 p-3 rounded-lg flex justify-center ${
              img === activeImage && activeStyling
            }`}
            onClick={() => setActiveImage(img)}
          >
            <img className="cursor-pointer" src={img} alt={name + " image"} />
          </div>
        ))}
      </div>
      <div className="w-[500px] h-[500px] p-10 flex items-center">
        <img className="" src={activeImage} alt={name + " image"} />
      </div>
    </div>
  );
};

export default ProductImages;

import React from "react";

const ProductCard = () => {
  return (
    <div className="flex flex-col w-[500px] justify-between bg-opacity-50 rounded-[1.5rem] hover:bg-transparent hover:border-gray-900 hover:border-opacity-75 transition-all duration-500 ease-in-out">
      <div className="pb-5 flex flex-col gap-3">
        <div className="h-56 w-full bg-gray-100 flex justify-center rounded-t-[1.5rem]">
          <img
            className="h-full"
            src={
              "https://static.vecteezy.com/system/resources/previews/022/722/945/original/samsung-galaxy-s23-ultra-transparent-image-free-png.png"
            }
            alt="Project Image"
          />
        </div>
        <div className="grid grid-cols-2">
          <h3 className="text-2xl font-bold">Product Name</h3>
          <div className="place-self-end flex flex-col items-end text-lg font-semibold">
            <p>
              <span className="text-red-600 font-normal">-17%</span> $83
            </p>
            <s className="text-slate-600">$100</s>
          </div>
        </div>
      </div>
      <button className="btn-primary-outline text-lg font-normal w-max">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

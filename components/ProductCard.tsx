import ProductType from "@/types/ProductType";
import Link from "next/link";
import React from "react";

const ProductCard = ({ name, brand, price, images, discount }: ProductType) => {
  return (
    <div className="flex flex-col w-[500px] justify-between bg-opacity-50 rounded-[1.5rem] hover:bg-transparent hover:border-gray-900 hover:border-opacity-75 transition-all duration-500 ease-in-out">
      <div className="pb-5 flex flex-col gap-3">
        <Link href={"/"} className="h-56 w-full bg-gray-100 flex justify-center rounded-t-[1.5rem]">
          <img className="h-full" src={images?.[0]} alt="Project Image" />
        </Link>
        <div className="grid grid-cols-2">
          <div>
            <Link href={"/"} className="text-2xl font-bold">
              {name}
            </Link>
            <p>{brand}</p>
          </div>
          <div className="place-self-end flex flex-col items-end text-lg font-semibold">
            <p>
              <span className="text-red-600 font-normal">-{discount}%</span> $
              {Number.parseInt(price) * (1 - Number.parseInt(discount) / 100)}
            </p>
            <s className="text-slate-600">${price}</s>
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

import ProductType from "@/types/ProductType";
import Link from "next/link";
import React from "react";
import CardPrice from "./CardPrice";

const ProductCard = ({ name, brand, price, images, discount }: ProductType) => {
  return (
    <div className="flex flex-col justify-between bg-opacity-50 rounded-[1.5rem] hover:bg-transparent hover:border-gray-900 hover:border-opacity-75 transition-all duration-500 ease-in-out">
      <div className="pb-5 flex flex-col gap-3">
        <Link
          href={"/"}
          className="h-56 w-full bg-gray-100 flex justify-center rounded-[1rem]"
        >
          <img className="h-full" src={images?.[0]} alt="Project Image" />
        </Link>
        <div className="grid grid-cols-2">
          <div>
            <Link href={"/"} className="text-2xl font-bold">
              {name}
            </Link>
            <p>{brand}</p>
          </div>
          <div className="flex flex-col items-end text-xl font-bold">
            <CardPrice price={price} discount={discount} />
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

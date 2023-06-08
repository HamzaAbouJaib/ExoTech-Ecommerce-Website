import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import CardPrice from "./CardPrice";
import { CartContext } from "@/store/CartContext";
import { useSession } from "next-auth/react";
import axios from "axios";

type ProductCardType = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: string;
  category: string;
  properties: { [key: string]: string };
  images: string[];
  discount: string;
  setFavouritesChanged?: (state: boolean) => void;
};

const ProductCard = ({
  _id,
  name,
  brand,
  price,
  images,
  discount,
  setFavouritesChanged,
}: ProductCardType) => {
  const { addProductToCart } = useContext(CartContext);
  const { data: session } = useSession();
  const [favourites, setFavourites] = useState<string[]>();

  useEffect(() => {
    if (!session) return;
    fetchFavourites();
  }, [session]);

  function fetchFavourites() {
    axios.get("/api/customers?email=" + session.user.email).then((response) => {
      setFavourites(response.data.favourites);
    });
  }

  function isFavourite() {
    if (!favourites) return false;
    return favourites?.includes(_id);
  }

  async function favouriteProduct() {
    if (isFavourite()) {
      await axios.delete(
        "/api/customers?email=" + session.user.email + "&favourite=" + _id
      );
    } else {
      axios.put("/api/customers", {
        email: session.user.email,
        favourite: _id,
      });
    }
    if (setFavouritesChanged) setFavouritesChanged(true);
    fetchFavourites();
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="pb-5 flex flex-col gap-3 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={
            "w-6 h-6 absolute top-3 right-3 cursor-pointer text-red-600 transition- duration-500 ease-out " +
            (isFavourite()
              ? "fill-red-600 hover:fill-gray-100"
              : "fill-gray-100 hover:fill-red-600")
          }
          onClick={favouriteProduct}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>

        <Link
          href={"/products/" + _id}
          className="h-56 w-full bg-gray-100 flex justify-center rounded-[1rem] p-4"
        >
          <img className="h-full" src={images?.[0]} alt="Project Image" />
        </Link>
        <div>
          <div>
            <Link href={"/products/" + _id} className="text-2xl font-bold">
              {name}
            </Link>
            <p>{brand}</p>
          </div>
          <div className="flex flex-col items-start text-xl font-bold mt-2">
            <CardPrice price={price} discount={discount} />
          </div>
        </div>
      </div>
      <button
        className="btn-primary-outline text-lg font-normal w-max"
        onClick={() => addProductToCart(_id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

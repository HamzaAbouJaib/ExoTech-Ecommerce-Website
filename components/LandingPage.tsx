import { CartContext } from "@/store/CartContext";
import Link from "next/link";
import { useContext } from "react";

const LandingPage = ({ featured }) => {
  const { addProductToCart } = useContext(CartContext);

  return (
    <div className="lg:min-h-[80dvh] h-max max-lg:pb-16 pt-16 bg-slate-900 flex items-center text-white">
      <div className="w-[80%] m-auto grid lg:grid-cols-2 gap-12 lg:gap-32 max-lg:pt-10">
        <div className="flex flex-col gap-8 justify-center max-lg:order-2">
          <h1 className="lg:text-5xl text-3xl font-semibold">
            {featured.name}
          </h1>
          <p className="text-lg text-slate-200">{featured.description}</p>
          <div className="flex gap-5 text-lg sm:text-xl sm:mt-5">
            <Link href={"/products/" + featured._id} className="btn-secondary">
              Read More
            </Link>
            <button
              className="btn-primary"
              onClick={() => addProductToCart(featured._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center max-lg:order-1 max-lg:mt-5">
          <img
            src={featured?.images?.[0]}
            alt={featured.name}
            className="h-max-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import Navigation from "@/components/Navigation";
import OrderSummary from "@/components/OrderSummary";
import { CartContext } from "@/store/CartContext";
import ProductType from "@/types/ProductType";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <h1 className="text-3xl font-semibold mb-7 mt-20">Cart</h1>
        <div className="grid grid-cols-3 gap-20">
          <OrderSummary products={products} />
          <div className="border border-gray-300 shadow-md p-5 rounded-xl">
            <h3 className="mb-1 font-semibold text-gray-800">Delivery Information</h3>
          </div>
        </div>
      </div>
    </>
  );
}

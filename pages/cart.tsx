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
          <div className="border border-gray-300 shadow-md p-10 rounded-xl h-max">
            <h3 className="mb-1 font-semibold text-gray-800">
              Delivery Information
            </h3>
            <div className="flex flex-col delivery gap-1">
              <label>Name</label>
              <input type="text" placeholder="Name" />
              <label>Email</label>
              <input type="email" placeholder="Email" />
              <label>Mobile Number</label>
              <input type="text" placeholder="Mobile Number" />
              <label>Address</label>
              <input type="text" placeholder="Address" />
              <label>Postal Code</label>
              <input type="text" placeholder="Postal Code" />
              <label>City</label>
              <input type="text" placeholder="City" />
              <label>Country</label>
              <input type="text" placeholder="Country" />{" "}
              <button className="btn-primary mt-5 w-full">
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import OrderSummary from "@/components/OrderSummary";
import CartItems from "@/components/CartItems";
import SuccessfulPayment from "@/components/SuccessfulPayment";
import { CartContext } from "@/store/CartContext";
import ProductType from "@/types/ProductType";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { ClipLoader } from "react-spinners";

export default function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState<ProductType[]>();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  if (domLoaded && window.location.href.includes("success")) {
    clearCart();
    return <SuccessfulPayment />;
  }

  return (
    <Layout>
      <div className="w-[80%] m-auto mb-10 lg:pt-20 pt-10 min-h-screen">
        <h1 className="text-3xl font-semibold mb-7 mt-20">Cart</h1>
        {products ? (
          <div className="grid xl:grid-cols-3 lg:gap-16 gap-10">
            <CartItems products={products} />
            {cartProducts.length > 0 && <OrderSummary products={products} />}
          </div>
        ) : (
          <ClipLoader
            color={"#1e6cd9"}
            loading={true}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </Layout>
  );
}

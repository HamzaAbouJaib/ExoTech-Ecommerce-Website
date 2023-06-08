import { CartContext } from "@/store/CartContext";
import axios from "axios";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProductType from "@/types/ProductType";

const OrderSummary = ({ products }: { products: ProductType[] }) => {
  const { cartProducts } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();

  let total = 0;
  for (const productId of cartProducts) {
    const price =
      products.find((product) => product._id === productId)?.price || "0";
    total += Number.parseFloat(price);
  }

  async function proceedToPayment() {
    if (!session) {
      router.push("/login");
      return;
    }

    let customer;

    await axios
      .get("/api/customers?email=" + session.user.email)
      .then((response) => {
        customer = response.data;
      });

    const response = await axios.post("/api/checkout", {
      name: customer.name,
      email: customer.email,
      mobile: customer.mobile,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  return (
    <div className="border border-gray-300 shadow-md p-10 rounded-xl h-max w-full">
      <h3 className="mb-1 font-semibold text-gray-800">Order Summary</h3>
      <div className="flex flex-col delivery gap-1">
        <div className="text-xl font-semibold flex max-sm:flex-col sm:items-center justify-between px-1 border-t-2 border-gray-300 mt-2 pt-2">
          <p className="text-gray-500">Subtotal</p>
          CA$
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(total)}
        </div>
        <div className="text-sm font-semibold flex items-center justify-between px-1 border-t border-gray-300 mt-2 pt-2">
          <p className="text-gray-500">
            Shipping options available on checkout page
          </p>
        </div>
        <button className="btn-primary mt-5 w-full" onClick={proceedToPayment}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;

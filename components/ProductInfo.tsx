import { CartContext } from "@/store/CartContext";
import ProductType from "@/types/ProductType";
import axios from "axios";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProductInfo = ({ product }: { product: ProductType }) => {
  const { addProductToCart } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();

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
      cartProducts: [product._id],
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  return (
    <div className="leading-none mt-4">
      <h1 className="text-4xl font-semibold">{product?.name}</h1>
      <p className="mb-4 text-gray-500 font-semibold text-lg">
        {product?.brand}
      </p>
      <div className="text-2xl font-semibold">
        {Number.parseFloat(product?.discount) > 0 ? (
          <div className="flex gap-2 items-center">
            <p>
              {"CA$" +
                new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(
                  Number.parseFloat(product?.price) *
                    (1 - Number.parseFloat(product?.discount) / 100)
                )}
            </p>
            <s className="text-red-600 text-lg font-normal">
              CA$
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(Number.parseFloat(product?.price))}
            </s>
          </div>
        ) : (
          <p>
            {"CA$" +
              new Intl.NumberFormat("en-US").format(
                Number.parseFloat(product?.price)
              )}
          </p>
        )}
      </div>
      <p className="text-lg text-gray-900 mb-4 mt-3">{product?.description}</p>
      <div className="flex gap-4 mb-5 flex-wrap">
        {Number.parseFloat(product?.discount) > 0 && (
          <p className="font-semibold flex items-center gap-1 text-white bg-red-600 rounded-md py-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6z"
              />
            </svg>
            {product?.discount}% Discount
          </p>
        )}

        {Object.keys(product?.properties).map((propertyKey: string) => (
          <p
            key={propertyKey}
            className="bg-gray-200 rounded-md py-2 px-4 flex items-center gap-1"
          >
            <span className="font-semibold capitalize">{propertyKey}:</span>
            {product?.properties[propertyKey]}
          </p>
        ))}
      </div>
      <div className="flex gap-2 mt-10">
        <button
          className="btn-primary-outline text-xl"
          onClick={() => addProductToCart(product?._id)}
        >
          Add to Cart
        </button>
        <button
          className="btn-primary font-semibold text-xl"
          onClick={proceedToPayment}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;

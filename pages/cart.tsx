import Navigation from "@/components/Navigation";
import { CartContext } from "@/store/CartContext";
import ProductType from "@/types/ProductType";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, addProductToCart, removeProductFromCart, clearCart } =
    useContext(CartContext);
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
        <div className="grid grid-cols-2 gap-20">
          <div className="border border-gray-300 shadow-md p-5 rounded-xl">
            {cartProducts?.length > 0 ? (
              <table className="w-full ">
                <thead className="border-b-2 border-gray-300 text-gray-700 font-semibold uppercase">
                  <tr>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Price</td>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td className="flex gap-2 mt-4">
                        <img
                          className="w-32 bg-gray-100/50 rounded-lg"
                          src={product.images[0]}
                        />
                        <div>
                          <div>
                            <h5 className="font-semibold text-xl leading-none">
                              {product.name}
                            </h5>
                            <p>{product.brand}</p>
                          </div>
                          <div className="flex flex-wrap mt-2">
                            {Object.keys(product.properties).map(
                              (key, index) => (
                                <p className="text-gray-400 font-semibold capitalize text-sm">
                                  {product.properties[key]}
                                  <span className="mx-1 text-gray-400/50">
                                    {Object.keys(product.properties).length -
                                      1 !==
                                      index && "|"}
                                  </span>
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between w-max gap-4 border border-gray-400/80 rounded-md px-2 py-1">
                          <button
                            onClick={() => removeProductFromCart(product._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 12H6"
                              />
                            </svg>
                          </button>
                          <p>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </p>
                          <button onClick={() => addProductToCart(product._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m6-6H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * Number.parseFloat(product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-xl">Your Cart is Empty</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

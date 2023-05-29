import Navigation from "@/components/Navigation";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";
import { useState } from "react";

export default function ProductPage({ product }: { product: ProductType }) {
  const [activeImage, setActiveImage] = useState(product?.images?.[0]);

  const activeStyling = "bg-gray-200/70";

  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <div className="mt-32 grid grid-cols-2 gap-32">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-4 h-[500px] justify-center scrollable">
              {product?.images?.map((img) => (
                <div
                  className={`w-32 p-3 rounded-lg flex justify-center ${
                    img === activeImage && activeStyling
                  }`}
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    className="cursor-pointer"
                    src={img}
                    alt={product?.name + " image"}
                  />
                </div>
              ))}
            </div>
            <div className="w-[500px] h-[500px] p-10 flex items-center">
              <img
                className=""
                src={activeImage}
                alt={product?.name + " image"}
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{product?.name}</h1>
            <p className="mb-3 text-gray-600 font-semibold">{product?.brand}</p>

            <p className="text-lg text-gray-900 mb-7">{product?.description}</p>
            <div className="flex gap-4 mb-5">
              {Object.keys(product?.properties).map((propertyKey: string) => (
                <p className="bg-gray-200 py-1 px-3 rounded-xl">
                  <span className="font-semibold">{propertyKey}:</span>{" "}
                  {product?.properties[propertyKey]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  await mongooseConnect();
  const { product: _id } = context.query;
  let product;
  try {
    product = await Product.findOne({
      _id: _id,
      madeByGuest: { $eq: false },
    });
  } catch (error) {
    if (!product) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

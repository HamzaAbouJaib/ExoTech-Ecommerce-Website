import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";
import { useState } from "react";

export default function products({ products }: { products: ProductType[] }) {
  const [searchValue, setSearchValue] = useState("");

  function searchResults() {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );

    if (filteredProducts.length > 0) {
      return (
        <div className="mt-10">
          <h1 className="text-3xl font-semibold mb-7">{`Search result for \"${searchValue}\"`}</h1>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-3xl font-semibold mb-7 mt-10 break-words">
            Search results for "{searchValue}"
          </h1>
          <p className="text-lg font-semibold text-gray-600 break-words">
            There are no search results for "{searchValue}"
          </p>
        </div>
      );
    }
  }

  return (
    <Layout>
      <div className="w-[80%] m-auto mb-10 pt-48 min-h-screen">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border-2 border-gray-400 text-gray-700 text-lg py-2 px-4 rounded-md focus:outline-none focus:border-gray-800"
          value={searchValue}
          autoFocus={true}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue !== "" && searchResults()}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({ madeByGuest: { $eq: false } }, null, {
    sort: { _id: -1 },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";
import React from "react";

export default function hotDeals({ products }: { products: ProductType[] }) {
  return (
    <Layout>
      <div className="w-[80%] m-auto mb-10 lg:pt-20 pt-10 min-h-screen">
        <ProductsGrid title={"Hot Deals!"} products={products} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({ discount: { $gt: 0 } }, null, {
    sort: { _id: -1 },
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

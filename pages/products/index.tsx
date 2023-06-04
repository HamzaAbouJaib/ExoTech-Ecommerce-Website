import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";

export default function products({ products }: { products: ProductType[] }) {
  return (
    <Layout>
      <div className="w-[80%] m-auto mb-10 pt-20 min-h-screen">
        <ProductsGrid title={"All Products"} products={products} />
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

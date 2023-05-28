import Navigation from "@/components/Navigation";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";

export default function products({ products }: { products: ProductType[] }) {
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <ProductsGrid title={"All Products"} products={products} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {
    sort: { _id: -1 },
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

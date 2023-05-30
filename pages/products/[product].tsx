import Navigation from "@/components/Navigation";
import ProductImages from "@/components/ProductImages";
import ProductInfo from "@/components/ProductInfo";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";

export default function ProductPage({ product }: { product: ProductType }) {
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <div className="mt-32 grid grid-cols-2 gap-32">
          <ProductImages images={product?.images} name={product?.name} />
          <ProductInfo product={product} />
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

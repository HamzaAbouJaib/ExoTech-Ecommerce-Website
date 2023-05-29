import Navigation from "@/components/Navigation";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductPage() {
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <div className="mt-32 grid grid-cols-2 gap-32">
          <div>Image</div>
          <div>Info</div>
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

import LandingPage from "@/components/LandingPage";
import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";
import TodaysDeals from "@/components/TodaysDeals";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";

export default function Home({
  newDeals,
  recentProducts,
  featured,
}: {
  newDeals: ProductType[];
  recentProducts: ProductType[];
  featured: ProductType;
}) {
  return (
    <Layout>
      <LandingPage featured={featured} />
      <div className="w-[80%] m-auto mb-10 min-h-screen">
        <TodaysDeals newDeals={newDeals} />
        <ProductsGrid title={"New Arrivals"} products={recentProducts} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newDeals = await Product.find({ discount: { $gt: 0 } }, null, {
    sort: { _id: -1 },
    limit: 3,
  });
  const recentProducts = await Product.find(
    { madeByGuest: { $eq: false } },
    null,
    {
      sort: { _id: -1 },
      limit: 4,
    }
  );

  const products = await Product.find({ madeByGuest: { $eq: false } }, null, {
    sort: { _id: -1 },
  });

  const featured = products.find((product) => product.featured);

  return {
    props: {
      newDeals: JSON.parse(JSON.stringify(newDeals)),
      recentProducts: JSON.parse(JSON.stringify(recentProducts)),
      featured: JSON.parse(JSON.stringify(featured)),
    },
  };
}

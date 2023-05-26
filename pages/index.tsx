import LandingPage from "@/components/LandingPage";
import Navigation from "@/components/Navigation";
import ProductsGrid from "@/components/RecentProducts";
import TodaysDeals from "@/components/TodaysDeals";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";

export default function Home({
  newDeals,
  recentProducts,
}: {
  newDeals: ProductType[];
  recentProducts: ProductType[];
}) {
  return (
    <>
      <Navigation />
      <LandingPage />
      <div className="w-[80%] m-auto mb-10">
        <TodaysDeals newDeals={newDeals} />
        <ProductsGrid title={"New Arrivals"} recentProducts={recentProducts} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newDeals = await Product.find({ discount: { $gt: 0 } }, null, {
    sort: { _id: -1 },
    limit: 3,
  });
  const recentProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 6,
  });
  return {
    props: {
      newDeals: JSON.parse(JSON.stringify(newDeals)),
      recentProducts: JSON.parse(JSON.stringify(recentProducts)),
    },
  };
}

import LandingPage from "@/components/LandingPage";
import Navigation from "@/components/Navigation";
import TodaysDeals from "@/components/TodaysDeals";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";

export default function Home({ newDeals }: { newDeals: ProductType[] }) {
  return (
    <>
      <Navigation />
      <LandingPage />
      <div className="w-[80%] m-auto mb-10">
        <TodaysDeals newDeals={newDeals} />
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
  return {
    props: {
      newDeals: JSON.parse(JSON.stringify(newDeals)),
    },
  };
}

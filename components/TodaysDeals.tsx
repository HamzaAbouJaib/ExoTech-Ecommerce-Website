import ProductType from "@/types/ProductType";
import ProductCard from "./ProductCard";

const TodaysDeals = ({ newDeals }: { newDeals: ProductType[] }) => {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-semibold mb-7">
        Todays Best Deals For You!
      </h1>
      <div className="grid grid-cols-3 gap-20">
        {newDeals.map((deal) => (
          <ProductCard {...deal} />
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals;

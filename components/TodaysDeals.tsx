import ProductType from "@/types/ProductType";
import ProductCard from "./ProductCard";

const TodaysDeals = ({ newDeals }: { newDeals: ProductType[] }) => {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-semibold mb-7">
        Today's Best Deals For You!
      </h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-10">
        {newDeals.map((deal) => (
          <ProductCard key={deal._id} {...deal} />
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals;

import ProductType from "@/types/ProductType";
import ProductCard from "./ProductCard";

const RecentProducts = ({
  recentProducts,
}: {
  recentProducts: ProductType[];
}) => {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-semibold mb-7">
        New Arrivals
      </h1>
      <div className="grid grid-cols-3 gap-20">
        {recentProducts.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;

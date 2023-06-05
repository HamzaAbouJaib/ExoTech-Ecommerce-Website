import ProductType from "@/types/ProductType";
import ProductCard from "./ProductCard";

const ProductsGrid = ({
  title,
  products,
}: {
  title: string;
  products: ProductType[];
}) => {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-semibold mb-7">{title}</h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-10">
        {products.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;

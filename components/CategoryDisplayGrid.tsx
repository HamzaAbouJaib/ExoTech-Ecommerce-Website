import ProductType from "@/types/ProductType";
import ProductCard from "./ProductCard";
import Link from "next/link";
import CategoryType from "@/types/CategoryType";

type CategoryDisplayGridType = {
  category: CategoryType;
  link?: string;
  products: ProductType[];
};

const CategoryDisplayGrid = ({
  category,
  link,
  products,
}: CategoryDisplayGridType) => {
  return (
    <div className="mt-20">
      <div>
        <h1 className="text-3xl font-semibold mb-7">{category?.name}</h1>
        {!link && <div>{}</div>}
      </div>
      <div className="grid grid-cols-4 gap-10">
        {products.slice(0, 2).map((product) => (
          <ProductCard {...product} />
        ))}
        {link && (
          <Link
            href={link}
            className="bg-slate-200 text-3xl font-semibold flex justify-center items-center gap-2 rounded-[1.5rem] hover:bg-slate-300 duration-500"
          >
            Show All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryDisplayGrid;

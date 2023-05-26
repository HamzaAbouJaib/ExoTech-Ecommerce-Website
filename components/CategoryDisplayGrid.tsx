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
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-7">{category?.name}</h1>
        {!link && (
          <div className="flex gap-5">
            {category?.properties.map((p) => (
              <div className="bg-gray-100 flex items-center h-max px-6 py-2 gap-5 text-lg rounded-lg">
                <label className="">{p.name}:</label>
                <select
                  className="bg-gray-100"
                  // value={properties[p.name]}
                  // make it change the property at the right index
                  // onChange={(e) =>
                  //   setProductProperty(p.name, e.target.value)
                  // }
                >
                  {p.values.map((value: string) => (
                    <option className="w-40" value={value}>{value}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
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

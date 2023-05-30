import ProductType from "@/types/ProductType";
import ProductCard from "./ProductCard";
import Link from "next/link";
import CategoryType from "@/types/CategoryType";
import { useEffect, useState } from "react";

type CategoryDisplayGridType = {
  category: CategoryType;
  link?: string;
  products: ProductType[];
};

const CategoryDisplayGrid = ({
  category,
  link,
  products: unfilteredProducts,
}: CategoryDisplayGridType) => {
  const [properties, setProperties] = useState<{ [key: string]: string }>({});
  const [products, setProducts] = useState(unfilteredProducts);

  function setProductProperty(name: string, value: string) {
    setProperties((prev) => {
      const newProductProperties = { ...prev };
      newProductProperties[name] = value;
      return newProductProperties;
    });
  }

  useEffect(() => {
    const prop: { [key: string]: string } = {};
    for (const key of Object.keys(products[0].properties)) {
      prop[key] = "All";
    }
    setProperties(prop);
    unfilteredProducts.sort(compareDate);
    setProducts(unfilteredProducts);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [properties]);

  function fetchProducts() {
    const filteredProducts = unfilteredProducts.filter((product: any) => {
      let include = true;
      for (const key of Object.keys(properties)) {
        if (key === "sort") continue;
        if (
          product?.properties?.[key] !== properties[key] &&
          properties[key] !== "All"
        ) {
          include = false;
        }
      }
      if (include) return product;
    });

    if (properties["sort"] === "newest") {
      filteredProducts.sort(compareDate);
    } else if (properties["sort"] === "oldest") {
      filteredProducts.sort(compareDate).reverse();
    } else if (properties["sort"] === "priceUp") {
      filteredProducts.sort(comparePrice);
    } else if (properties["sort"] === "priceDown") {
      filteredProducts.sort(comparePrice).reverse();
    }

    setProducts(filteredProducts);
  }

  function compareDate(a: any, b: any) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  }

  function comparePrice(a: any, b: any) {
    const priceA =
      Number.parseFloat(a.price) * (1 - Number.parseFloat(a.discount) / 100);
    const priceB =
      Number.parseFloat(b.price) * (1 - Number.parseFloat(b.discount) / 100);
    if (priceA > priceB) {
      return 1;
    }
    if (priceA < priceB) {
      return -1;
    }
    return 0;
  }

  return (
    <div className="mt-20">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-7">{category?.name}</h1>
        {!link && (
          <div className="flex gap-5">
            {category?.properties.map((p) => (
              <div className="bg-gray-100 flex items-center h-max px-6 py-2 gap-5 text-lg rounded-lg">
                <label className="capitalize">{p.name}:</label>
                <select
                  className="bg-gray-100"
                  value={properties[p.name]}
                  onChange={(e) => setProductProperty(p.name, e.target.value)}
                >
                  <option className="w-40" value="All">
                    All
                  </option>
                  {p.values.map((value: string) => (
                    <option className="w-40 capitalize" value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="bg-gray-100 flex items-center h-max px-6 py-2 gap-5 text-lg rounded-lg">
              <label className="">Sort By:</label>
              <select
                className="bg-gray-100"
                value={properties["sort"]}
                onChange={(e) => {
                  setProductProperty("sort", e.target.value);
                }}
              >
                <option className="w-40" value={"newest"}>
                  {"Newest First"}
                </option>
                <option className="w-40" value={"oldest"}>
                  {"Oldest First"}
                </option>
                <option className="w-40" value={"priceUp"}>
                  {"Price Low to High"}
                </option>
                <option className="w-40" value={"priceDown"}>
                  {"Price High to Low"}
                </option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-10">
        {products?.map((product) => (
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

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
  const [opened, setOpened] = useState(false);

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
      <div className="flex flex-col mb-10">
        <div
          className={
            "flex gap-4 items-baseline w-full " + (!link && "justify-between")
          }
        >
          <h1 className="text-3xl font-semibold mb-7">{category?.name} </h1>
          {link && (
            <Link className="text-lg text-primary underline" href={link}>
              View More
            </Link>
          )}
          {!link && (
            <button
              className=" bg-gray-100 flex gap-2 items-center h-max w-max px-6 py-2 text-lg rounded-lg"
              onClick={() => setOpened((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Filters
            </button>
          )}
        </div>
        {!link && (
          <div
            className={
              "flex gap-5 flex-wrap max-lg:border-b-2 max-lg:pb-3 " +
              (opened ? "" : "hidden")
            }
          >
            {category?.properties.map((p) => (
              <div
                key={p.name}
                className="bg-gray-100 flex items-center h-max w-max px-6 py-2 gap-5 text-lg rounded-lg"
              >
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
                    <option
                      key={value}
                      className="w-40 capitalize"
                      value={value}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="bg-gray-100 flex items-center h-max w-max px-6 py-2 gap-5 text-lg rounded-lg">
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
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-10">
        {link
          ? products
              ?.slice(0, 3)
              .map((product) => <ProductCard key={product._id} {...product} />)
          : products?.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
      </div>
    </div>
  );
};

export default CategoryDisplayGrid;

import CategoryDisplayGrid from "@/components/CategoryDisplayGrid";
import Navigation from "@/components/Navigation";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import CategoryType from "@/types/CategoryType";
import ProductType from "@/types/ProductType";
import { log } from "console";

export default function categories({
  categoryProducts,
}: {
  categoryProducts: { category: CategoryType; products: ProductType[] }[];
}) {
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        {categoryProducts.map((categoryProduct) => {
          if (categoryProduct?.products.length > 0) {
            return (
              <CategoryDisplayGrid
                title={categoryProduct?.category?.name}
                link={"/categories/" + categoryProduct?.category._id}
                products={categoryProduct?.products}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categoryProducts: any[] = [];
  const categories = await Category.find({});
  const allProducts = await Product.find({ madeByGuest: { $eq: false } });

  for (const category of categories) {
    const products = [];
    let selectedCategory = category;
    products.push(
      ...allProducts.filter((p) => p.category.equals(selectedCategory._id))
    );
    while (selectedCategory?.parent?._id) {
      const parentCategory = categories.find(({ _id }) =>
        _id.equals(selectedCategory.parent._id)
      );

      products.push(
        ...allProducts.filter((p) => p.category.equals(parentCategory?._id))
      );
      selectedCategory = parentCategory;
    }

    let add = true;

    for (const categoryProduct of categoryProducts) {
      if (categoryProduct.category.equals(selectedCategory)) {
        categoryProduct.products.push(...products);
        add = false;
        break;
      }
    }

    if (add) {
      categoryProducts.push({ category: selectedCategory, products: products });
    }
  }

  return {
    props: {
      categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
    },
  };
}

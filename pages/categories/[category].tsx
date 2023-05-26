import CategoryDisplayGrid from "@/components/CategoryDisplayGrid";
import Navigation from "@/components/Navigation";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import CategoryType from "@/types/CategoryType";
import ProductType from "@/types/ProductType";
import { useRouter } from "next/router";

export default function CategoryPage({
  categoryProduct,
}: {
  categoryProduct: { category: CategoryType; products: ProductType[] };
}) {
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <CategoryDisplayGrid
          category={categoryProduct?.category}
          products={categoryProduct?.products}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  await mongooseConnect();
  const { category: _id } = context.query;
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

  let categoryToSend;
  let validCategory = false;

  for (const categoryProduct of categoryProducts) {
    if (categoryProduct.category._id.equals(_id)) {
      categoryToSend = categoryProduct;
      validCategory = true;
    }
  }

  if (!validCategory) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categoryProduct: JSON.parse(JSON.stringify(categoryToSend)),
    },
  };
}

import { Category } from "@/models/Category";
import { mongooseConnect } from "./mongoose";
import { Product } from "@/models/Product";

export async function getCategoryProducts() {
  await mongooseConnect();
  const categoryProducts: any[] = [];
  const categories = await Category.find();
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
    console.log(categoryProducts[0]?.products);

    if (add) {
      categoryProducts.push({ category: selectedCategory, products: products });
    }
  }
  return categoryProducts;
}

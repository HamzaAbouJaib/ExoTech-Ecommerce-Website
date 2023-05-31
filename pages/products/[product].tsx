import Navigation from "@/components/Navigation";
import ProductImages from "@/components/ProductImages";
import ProductInfo from "@/components/ProductInfo";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductType from "@/types/ProductType";
import { Category } from "@/models/Category";
import ProductsGrid from "@/components/ProductsGrid";
import { getCategoryProducts } from "@/lib/getCategoryProducts";

export default function ProductPage({
  product,
  similarProducts,
}: {
  product: ProductType;
  similarProducts: ProductType[];
}) {
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <div className="mt-32 grid grid-cols-2 gap-32">
          <ProductImages images={product?.images} name={product?.name} />
          <ProductInfo product={product} />
        </div>
        <ProductsGrid title={"Similar Products"} products={similarProducts} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  await mongooseConnect();
  const { product: productId } = context.query;
  let product;
  try {
    product = await Product.findOne({
      _id: productId,
      madeByGuest: { $eq: false },
    });
  } catch (error) {
    if (!product) {
      return {
        notFound: true,
      };
    }
  }

  const categoryProducts = await getCategoryProducts();
  const categories = await Category.find({});
  const categoryId = product?.category;
  let similarProducts;

  if (categoryId && categories.length > 0) {
    let selectedCategory = categories.find(({ _id }) => _id.equals(categoryId));

    while (selectedCategory?.parent?._id) {
      const parentCategory = categories.find(({ _id }) =>
        _id.equals(selectedCategory?.parent?._id)
      );
      selectedCategory = parentCategory;
    }

    similarProducts = categoryProducts.filter(({ category }) =>
      category._id.equals(selectedCategory?._id)
    )[0].products;
  }

  similarProducts = similarProducts.filter(
    (product: ProductType) => productId !== product?._id.toString()
  );

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      similarProducts: JSON.parse(JSON.stringify(similarProducts)),
    },
  };
}

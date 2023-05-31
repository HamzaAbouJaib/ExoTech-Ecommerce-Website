import CategoryDisplayGrid from "@/components/CategoryDisplayGrid";
import Navigation from "@/components/Navigation";
import { getCategoryProducts } from "@/lib/getCategoryProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import CategoryType from "@/types/CategoryType";
import ProductType from "@/types/ProductType";

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
                category={categoryProduct?.category}
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
  const categoryProducts = await getCategoryProducts();

  return {
    props: {
      categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
    },
  };
}

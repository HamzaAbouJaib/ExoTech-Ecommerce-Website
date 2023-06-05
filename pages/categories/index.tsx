import CategoryDisplayGrid from "@/components/CategoryDisplayGrid";
import Layout from "@/components/Layout";
import { getCategoryProducts } from "@/lib/getCategoryProducts";
import CategoryType from "@/types/CategoryType";
import ProductType from "@/types/ProductType";

export default function categories({
  categoryProducts,
}: {
  categoryProducts: { category: CategoryType; products: ProductType[] }[];
}) {
  return (
    <Layout>
      <div className="w-[80%] m-auto mb-10 lg:pt-20 pt-10 min-h-screen">
        {categoryProducts.map((categoryProduct) => {
          if (categoryProduct?.products.length > 0) {
            return (
              <CategoryDisplayGrid
                key={categoryProduct.category._id}
                category={categoryProduct?.category}
                link={"/categories/" + categoryProduct?.category._id}
                products={categoryProduct?.products}
              />
            );
          }
        })}
      </div>
    </Layout>
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

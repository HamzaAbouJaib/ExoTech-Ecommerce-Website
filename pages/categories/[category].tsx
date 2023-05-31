import CategoryDisplayGrid from "@/components/CategoryDisplayGrid";
import Navigation from "@/components/Navigation";
import { getCategoryProducts } from "@/lib/getCategoryProducts";
import CategoryType from "@/types/CategoryType";
import ProductType from "@/types/ProductType";

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
  const { category: _id } = context.query;
  const categoryProducts = await getCategoryProducts();

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

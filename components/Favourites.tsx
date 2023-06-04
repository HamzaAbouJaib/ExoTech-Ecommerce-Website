import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductType from "@/types/ProductType";
import ProductCard from "./ProductCard";

const Favourites = () => {
  const { data: session } = useSession();
  const [favouriteProducts, setFavouriteProducts] = useState<ProductType[]>();

  useEffect(() => {
    if (!session) return;
    axios.get("/api/customers?email=" + session.user.email).then((response) => {
      axios
        .post("/api/products", { ids: response.data.favourites })
        .then((res) => {
          setFavouriteProducts(res.data);
        });
    });
  }, [session]);

  return (
    <div>
      {favouriteProducts?.length > 0 ? (
        <div className="grid grid-cols-3 gap-10">
          {favouriteProducts.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      ) : (
        <div className="text-xl">You have no favourited products</div>
      )}
    </div>
  );
};

export default Favourites;

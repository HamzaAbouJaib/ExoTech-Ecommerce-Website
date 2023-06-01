import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.json("Error: Request must be a POST request");
    return;
  }
  await mongooseConnect();
  const {
    name,
    email,
    mobile,
    address,
    postalCode,
    city,
    country,
    cartProducts,
  } = req.body;

  const uniqueProductIds = [...new Set(cartProducts)];
  const productsInfo = await Product.find({ _id: uniqueProductIds });

  // Stripe data
  let line_items = [];
  for (const productId of uniqueProductIds) {
    const productInfo = productsInfo.find(
      (p) => p._id.toString() === productId
    );
    const quantity =
      cartProducts.filter((p: string) => p.toString() === productId)?.length ||
      0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: productInfo.name,
          },
          unit_amount: productInfo.price * 100,
        },
      });
    }
  }

  res.json({ line_items });
}

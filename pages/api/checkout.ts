import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

  let total = 0;

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
      total += Number.parseFloat(productInfo.price) * quantity;
      line_items.push({
        quantity,
        price_data: {
          currency: "CAD",
          product_data: {
            name: productInfo.name,
          },
          unit_amount: Math.round(Number.parseFloat(productInfo.price) * 100),
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    mobile,
    address,
    postalCode,
    city,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 5000,
            currency: "cad",
          },
          display_name: "Standard shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: {
      orderId: orderDoc._id.toString(),
    },
  });

  res.json({
    url: session.url,
  });
}

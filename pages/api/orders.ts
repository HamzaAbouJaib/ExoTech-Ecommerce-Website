import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Order.find({ _id: ids, paid: { $eq: true } }));
}

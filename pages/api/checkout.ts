import { mongooseConnect } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseConnect();
}

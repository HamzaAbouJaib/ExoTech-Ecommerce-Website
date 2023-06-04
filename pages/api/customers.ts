import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.email) {
      res.json(await Customer.findOne({ email: req.query.email }));
    } else {
      res.json(await Customer.find().sort({ createdAt: -1 }));
    }
  }

  if (method === "PUT") {
    const { _id, name, email, mobile, password, favourite } = req.body;
    let CustomerDoc;
    if (favourite) {
      CustomerDoc = await Customer.findOneAndUpdate(
        { email },
        { $push: { favourites: favourite } }
      );
    } else {
      CustomerDoc = await Customer.updateOne(
        { _id },
        {
          name,
          email,
          mobile,
          password: bcrypt.hashSync(password),
        }
      );
    }
    res.json(CustomerDoc);
  }

  if (method === "POST") {
    const { name, email, mobile, password } = req.body;
    const existingCustomer = await Customer.findOne({ email: email });
    if (existingCustomer) {
      res.status(422).json({ message: "User exists already!" });
      return;
    }
    const CustomerDoc = await Customer.create({
      name,
      email,
      mobile,
      password: bcrypt.hashSync(password),
    });
    res.json(CustomerDoc);
  }
}

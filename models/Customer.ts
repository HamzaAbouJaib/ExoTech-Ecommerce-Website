import mongoose, { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const Customer = models.Customer || model("Customer", CustomerSchema);

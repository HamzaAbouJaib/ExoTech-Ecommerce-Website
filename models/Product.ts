import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    brand: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    images: [{ type: String }],
    discount: Number,
    madeByGuest: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);

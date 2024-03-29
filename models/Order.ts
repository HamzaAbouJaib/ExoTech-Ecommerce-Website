import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    mobile: String,
    address: String,
    postalCode: String,
    city: String,
    state: String,
    country: String,
    paid: Boolean,
    status: String,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);

export default interface ProductType {
  _id?: string;
  name?: string;
  description?: string;
  brand?: string;
  price?: string;
  category?: string;
  properties?: { name: string; value: string };
  images?: string[];
  discount?: string;
}

export default interface ProductType {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: string;
  category: string;
  properties: { [key: string]: string };
  images: string[];
  discount: string;
  featured: boolean;
}

export default interface CategoryType {
  _id: string;
  name: string;
  parent: string;
  properties: { name: string; values: string[] }[];
}

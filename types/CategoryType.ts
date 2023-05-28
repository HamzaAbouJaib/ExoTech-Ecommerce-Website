export default interface CategoryType {
  _id: string;
  name: string;
  parent: CategoryType;
  properties: { name: string; values: string[] }[];
}

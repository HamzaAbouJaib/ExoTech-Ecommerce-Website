import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  await mongooseConnect();
}

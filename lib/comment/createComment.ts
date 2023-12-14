import type { NextApiRequest, NextApiResponse } from "next";


export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ message: "Hello world" });
}

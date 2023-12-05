import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;

  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", response.headers.get("content-type") || "");
  res.send(Buffer.from(buffer));
}

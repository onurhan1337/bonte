import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).send(response.statusText);
      return;
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", response.headers.get("content-type") || "");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

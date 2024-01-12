// pages/api/foundation/create.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, excerpt, description, image } = req.body;

    try {
      const newFoundation = await prisma.foundation.create({
        data: {
          name,
          excerpt,
          description,
          image,
          createdAt: new Date(),
        },
      });

      res.status(200).json(newFoundation);
    } catch (error) {
      res.status(500).json({ error: "Unable to create foundation" });
    }
  } else if (req.method === "GET") {
    try {
      const foundations = await prisma.foundation.findMany();
      res.status(200).json(foundations);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch foundations" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

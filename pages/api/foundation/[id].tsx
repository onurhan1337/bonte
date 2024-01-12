import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing id in query" });
  }

  if (req.method === "GET") {
    try {
      const foundation = await prisma.foundation.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!foundation) {
        return res.status(404).json({ message: "Foundation not found" });
      }

      return res.status(200).json(foundation);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "PUT") {
    const { name, excerpt, description, image } = req.body;
    const updatedFoundation = await prisma.foundation.update({
      where: { id: id as string },
      data: {
        name,
        excerpt,
        description,
        image,
      },
    });
    return res.json(updatedFoundation);
  }

  if (req.method === "DELETE") {
    const deletedFoundation = await prisma.foundation.delete({
      where: { id: id as string },
    });
    return res.json(deletedFoundation);
  }
}

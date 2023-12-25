import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getUser from "@/lib/getUser";

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUser(req, res);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name } = req.body;

  const prismaUser = await prisma.user.update({
    where: {
      email: user.email!,
    },
    data: {
      name,
    },
  });

  return res.status(201).json({
    user: prismaUser,
    message: "User updated successfully",
  });
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Missing user id",
    });
  }

  const donations = await prisma.donation.findMany({
    where: {
      userId: id,
    },
  });

  await prisma.$transaction([
    ...donations.map((donation) =>
      prisma.donation.delete({
        where: {
          id: donation.id,
        },
      })
    ),

    prisma.user.delete({
      where: {
        id,
      },
    }),
  ]);

  return res.status(201).json({
    message: "User deleted successfully",
  });
}

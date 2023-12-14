import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function fetchDonation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const donations = await prisma.donation.findMany({
    where: {
      userId: id as string,
    },
  });

  return res.status(200).json({ donations });
}

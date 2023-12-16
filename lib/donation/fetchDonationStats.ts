import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function fetchDonationStats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const donations = await prisma.donation.findMany({
    select: {
      userId: true,
      amount: true,
      createdAt: true,
    },
  });

  // Calculate stats here
  const totalDonations = donations.reduce(
    (acc, donation) => acc + donation.amount,
    0
  );
  const totalDonors = new Set(donations.map((donation) => donation.userId))
    .size;

  res.json({
    totalDonations,
    totalDonors,
  });
}

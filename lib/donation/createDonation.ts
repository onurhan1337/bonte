import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../prisma";
import getUser from "../getUser";

export default async function createDonation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUser(req, res);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const { name, email, amount, isAnonymous, foundation, message } = req.body;

    const donation = await prisma.donation.create({
      data: {
        name,
        email,
        amount,
        isAnonymous,
        foundation,
        message,
        userId: user.id,
      },
    });

    return res.status(201).json({
      donation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error donating",
    });
  }
}

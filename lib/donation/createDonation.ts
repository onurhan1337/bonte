import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import prisma from "../prisma";
import { Donation, FOUNDATIONS } from "../../interfaces";
import { getSession } from "@auth0/nextjs-auth0";

export default async function createDonation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);

  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const schema = z.object({
      name: z.string({}).min(3).max(50, {
        message: "Adınız en az 3, en fazla 50 karakter olmalıdır",
      }),
      email: z.string().email({
        message: "Geçerli bir e-posta adresi girmelisiniz",
      }),
      amount: z
        .number()
        .min(1, {
          message: "Ücret en az 1 TL olmalıdır",
        })
        .max(100000, {
          message: "Ücret en fazla 100.000 TL olmalıdır",
        }),

      isAnonymous: z.boolean().default(false).optional(),
      foundation: z
        .nativeEnum(FOUNDATIONS, {
          required_error: "Kurum seçmelisiniz",
        })
        .default(FOUNDATIONS.MehmetcikVakfi),
      message: z.string().min(5).max(250).optional(),
      updatedAt: z.string(),
      createdAt: z.string(),
    });

    const parsedData = schema.parse(req.body);

    const {
      name,
      email,
      amount,
      isAnonymous,
      foundation,
      message,
      updatedAt,
      createdAt,
    } = parsedData;

    const donation = await prisma.donation.create({
      data: {
        name,
        email,
        amount,
        isAnonymous,
        foundation,
        message,
        userId: session.idToken,
        createdAt,
        updatedAt,
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

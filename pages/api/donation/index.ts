import type { NextApiRequest, NextApiResponse } from "next";

import createDonation from "../../../lib/donation/createDonation";
import fetchDonationStats from "@/lib/donation/fetchDonationStats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return fetchDonationStats(req, res);
    case "POST":
      return createDonation(req, res);
    default:
      return res.status(400).json({ message: "Invalid method." });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";

import fetchDonation from "../../../lib/donation/fetchDonation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return fetchDonation(req, res);
    default:
      return res.status(400).json({ message: "Invalid method." });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";

import updateUser from "@/lib/user/updateUser";
import deleteUser from "@/lib/user/deleteUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PATCH":
      return updateUser(req, res);
    case "DELETE":
      return deleteUser(req, res);
    default:
      return res.status(400).json({ message: "Invalid method." });
  }
}

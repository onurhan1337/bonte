import type { NextApiRequest, NextApiResponse } from "next";
import type { User, Comment } from "../../interfaces";
import redis from "../redis";
import getUser from "../getUser";
import clearUrl from "../clearUrl";

export default async function deleteComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { comment }: { url: string; comment: Comment } = req.body;
  const { authorization } = req.headers;

  if (!comment || !authorization) {
    return res.status(400).json({ message: "Missing parameter." });
  }

  if (!redis) {
    return res.status(500).json({ message: "Failed to connect to redis." });
  }

  try {
    // verify user token

  

    // delete

    return res.status(200).end();
  } catch (err) {
    return res.status(400);
  }
}

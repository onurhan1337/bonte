import type { NextApiRequest, NextApiResponse } from "next";
import type { Comment } from "../../interfaces";
import redis from "../redis";
import clearUrl from "../clearUrl";

export default async function fetchComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ message: "Hello world" });
}

import type { NextApiRequest, NextApiResponse } from "next";
import type { Comment } from "../../interfaces";
import redis from "../redis";
import clearUrl from "../clearUrl";

export default async function fetchComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = clearUrl(req.headers.referer as string);

  if (!redis) {
    return res.status(400).json({ message: "Redis is not connected." });
  }

  try {
    const rawComments = await redis.lrange(url, 0, -1);

    const comments = rawComments.map((rawComment) => {
      const comment: Comment = JSON.parse(rawComment);
      delete comment.user.email;
      return comment;
    });

    return res.status(200).json(comments);
  } catch (_) {
    return res.status(400).json({ message: "Unexpected error occured." });
  }
}

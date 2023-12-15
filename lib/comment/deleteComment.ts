import type { NextApiRequest, NextApiResponse } from "next";

import redis from "../redis";
import getUser from "../getUser";
import clearUrl from "../clearUrl";
import type { Comment } from "../../interfaces";

export default async function deleteComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = clearUrl(req.headers.referer as string);
  const user = await getUser(req, res);
  const { comment }: { url: string; comment: Comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Missing parameter." });
  }

  if (!redis) {
    return res.status(400).json({ message: "Redis is not connected." });
  }

  try {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const isAdmin = process.env.NEXTAUTH_PUBLIC_ADMIN_EMAIL === user.email;
    const isAuthor = user.id === comment.user.id;

    if (!isAdmin && !isAuthor) {
      return res.status(400).json({ message: "Need Authorization." });
    }

    // Fetch all comments
    const comments = await redis.lrange(url, 0, -1);

    // Find the comment to delete
    const index = comments.findIndex((c) => JSON.parse(c).id === comment.id);

    if (index !== -1) {
      // Replace the comment with a placeholder
      await redis.lset(url, index, "__deleted__");

      // Remove the placeholder
      await redis.lrem(url, 0, "__deleted__");
    }

    return res.status(200).end();
  } catch (err) {
    return res.status(400);
  }
}

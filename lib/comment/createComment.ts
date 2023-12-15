import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

import redis from "../redis";
import getUser from "../getUser";
import clearUrl from "../clearUrl";
import { Comment } from "interfaces";

export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = clearUrl(req.headers.referer as string);
  const { text } = req.body;
  const user = await getUser(req, res);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (!text) {
    return res.status(400).json({ message: "Missing parameter." });
  }

  if (!redis) {
    return res.status(400).json({ message: "Redis is not connected." });
  }

  try {
    const { id, name, email, image } = user;

    const comment: Comment = {
      id: nanoid(),
      created_at: Date.now(),
      url,
      text,
      user: {
        id,
        name: name ?? undefined,
        email: email ?? undefined,
        image: image ?? undefined,
      },
    };

    await redis.lpush(url, JSON.stringify(comment));

    return res.status(200).json(comment);
  } catch (_) {
    return res.status(400).json({ message: "Unexpected error occurred." });
  }
}

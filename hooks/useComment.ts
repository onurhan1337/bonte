import * as React from "react";
import useSWR from "swr";

import fetcher from "@/lib/utils";
import type { Comment } from "../interfaces";

export default function useComments() {
  const [text, setText] = React.useState("");

  const { data: comments, mutate } = useSWR<Comment[]>(
    "/api/comment",
    fetcher,
    {
      fallbackData: [],
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setText("");
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (comment: Comment) => {
    try {
      await fetch("/api/comment", {
        method: "DELETE",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return { text, setText, comments, onSubmit, onDelete };
}

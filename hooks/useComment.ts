import * as React from "react";
import useSWR from "swr";

import fetcher from "@/lib/utils";
import type { Comment } from "../interfaces";

export default function useComments() {
  const [text, setText] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const { data: comments, mutate } = useSWR<Comment[]>(
    "/api/comment",
    fetcher,
    {
      fallbackData: [],
    }
  );

  const onSubmit = async (e: React.FormEvent, rating: number) => {
    e.preventDefault();

    try {
      await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ text, rating }), // Include the rating in the body of the POST request
        headers: {
          "Content-Type": "application/json",
        },
      });
      setText("");
      setRating(0); // Reset the rating after submitting
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

  return { text, setText, rating, setRating, comments, onSubmit, onDelete }; // Include the rating and setRating in the returned object
}

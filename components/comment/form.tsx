import * as React from "react";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";

import LoadingSpinner from "../shared/icons/loading-spinner";

type CommentFormProps = {
  text: string;
  setText: Function;
  onSubmit: (e: React.FormEvent, rating: number) => Promise<void>; // Add a second argument rating
};

export default function CommentForm({
  text,
  setText,
  onSubmit: handleSubmit,
}: CommentFormProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    setIsLoading(true);
    await handleSubmit(e, rating); // Pass the rating to the handleSubmit function
    setIsLoading(false);
  };

  const getPlaceholder = () => {
    return session
      ? "Düşünceleriniz nedir?"
      : "Yorum yapabilmek için giriş yapın.";
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-300 focus:outline-none"
        rows={2}
        placeholder={getPlaceholder()}
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!session}
      />

      {session && (
        <>
          <div className="flex items-center mt-4">
            {[...Array(5)].map((star, i) => (
              <StarRating
                key={i}
                index={i}
                rating={rating}
                setRating={setRating}
              />
            ))}
          </div>

          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="py-2 px-8 w-36 h-10 inline-flex justify-center items-center rounded-full bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 disabled:cursor-not-allowed"
              disabled={isLoading || !text}
            >
              {isLoading ? <LoadingSpinner /> : "Gönder"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export const StarRating = ({
  index,
  rating,
  setRating,
  readOnly,
}: {
  index: number;
  rating: number;
  setRating?: Function;
  readOnly?: boolean;
}) => {
  const handleClick = () => {
    if (!readOnly && setRating) {
      setRating(index + 1);
    }
  };

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name="rating"
        value={index + 1}
        onClick={handleClick}
        className="hidden"
        disabled={readOnly}
      />
      {index + 1 <= rating ? (
        <Star className="text-yellow-500 fill-yellow-500 w-6 h-6" />
      ) : (
        <Star className="text-gray-300 w-6 h-6" />
      )}
    </label>
  );
};

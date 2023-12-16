import { useState } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../shared/icons/loading-spinner";

type CommentFormProps = {
  text: string;
  setText: Function;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export default function CommentForm({
  text,
  setText,
  onSubmit: handleSubmit,
}: CommentFormProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    await handleSubmit(e);
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-300 focus:outline-none"
        rows={2}
        placeholder={
          session
            ? `Düşünceleriniz nedir?`
            : "Yorum yapabilmek için giriş yapın."
        }
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!session}
      />
      <div className="flex items-center mt-4">
        {session && (
          <button
            type="submit"
            className="py-2 px-8 w-36 h-10 inline-flex justify-center items-center rounded-full bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 disabled:cursor-not-allowed"
            disabled={isLoading || !text}
          >
            {isLoading ? <LoadingSpinner /> : "Gönder"}
          </button>
        )}
      </div>
    </form>
  );
}

import { useSession } from "next-auth/react";

type CommentFormProps = {
  text: string;
  setText: Function;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export default function CommentForm({
  text,
  setText,
  onSubmit,
}: CommentFormProps) {
  const { data: session } = useSession();

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
          <button className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700">
            Gönder
          </button>
        )}
      </div>
    </form>
  );
}

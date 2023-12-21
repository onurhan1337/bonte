import Link from "next/link";
import { useRouter } from "next/router";

import { Foundation } from "../../interfaces";

const FoundationCard = ({ foundation }: { foundation: Foundation }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden min-h-full">
      <div className="grid place-items-center border-b max-h-28">
        <img
          src={foundation.image}
          alt="Foundation"
          className="object-contain py-2 w-full max-h-24"
        />
      </div>
      <div className="p-4">
        <Link
          as={`/foundations/${foundation.slug}`}
          href="/foundations/[slug]"
          className="text-lg leading-6 font-bold"
        >
          {foundation.title}
        </Link>
        <p className="text-gray-700 text-left py-2 text-sm">
          {foundation.excerpt}
        </p>
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={() => router.push(`/foundations/${foundation.slug}`)}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1 px-3.5 rounded"
        >
          İncele
        </button>
      </div>
    </div>
  );
};

export default FoundationCard;

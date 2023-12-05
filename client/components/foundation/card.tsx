import Link from "next/link";
import { useRouter } from "next/router";

import { Foundation } from "../../interfaces";

const FoundationCard = ({ foundation }: { foundation: Foundation }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div>
        <img
          src={foundation.image}
          alt="Foundation"
          width={400}
          height={400}
          className="object-fill p-3"
        />
      </div>
      <div className="p-4 border-t">
        <Link
          as={`/foundations/${foundation.slug}`}
          href="/foundations/[slug]"
          className="text-lg leading-6 font-bold"
        >
          {foundation.title}
        </Link>
        <p className="text-gray-700 text-left">{foundation.excerpt}</p>
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

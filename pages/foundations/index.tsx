import Head from "next/head";
import useSWR from "swr";

import Container from "../../components/shared/container";
import { fetcher } from "@/lib/utils";
import FoundationCard from "../../components/foundation/card";

type Foundation = {
  id: number;
  name: string;
  excerpt: string;
  description: string;
  image: string;
  slug: string;
};

export default function NotePage() {
  const { data: allFoundations, error } = useSWR<Foundation[]>(
    "/api/foundation",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!allFoundations) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Kurumlar | Bonte</title>
      </Head>

      <Container>
        {allFoundations.length ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allFoundations.map((foundation) => (
              <article key={foundation.slug} className="mb-10">
                <FoundationCard foundation={foundation} />
              </article>
            ))}
          </div>
        ) : (
          <p>No Foundations added yet./</p>
        )}
      </Container>
    </>
  );
}

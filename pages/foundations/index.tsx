import type { InferGetStaticPropsType } from "next";
import Head from "next/head";

import Container from "../../components/container";
import FoundationCard from "../../components/foundation/card";
import { getAllFoundations } from "../../lib/getFoundation";

export default function NotePage({
  allFoundations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

export async function getStaticProps() {
  const allFoundations = getAllFoundations([
    "slug",
    "title",
    "image",
    "excerpt",
    "date",
  ]);

  return {
    props: { allFoundations },
  };
}

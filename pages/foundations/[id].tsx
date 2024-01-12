import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";

import Container from "@/components/shared/container";
import Comment from "@/components/comment";
import { Foundation } from "interfaces";
import fetcher from "@/lib/utils";

export default function FoundationPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: foundation, error } = useSWR<Foundation>(
    id ? `/api/foundation/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!foundation) return <div>Loading...</div>;

  return (
    <Container>
      <Head>
        <title>{`${foundation.name} | Bonte`}</title>
      </Head>

      <div>
        <article>
          <div className="grid place-items-center">
            <img
              src={foundation.image}
              alt="Foundation"
              width={400}
              height={400}
            />
          </div>
          <header>
            <h1 className="text-3xl font-bold my-6">{foundation.name}</h1>
            <p className="mt-2 text-justify text-xl">{foundation.excerpt}</p>
          </header>
          <div
            className="prose-base text-justify mt-10"
            dangerouslySetInnerHTML={{ __html: foundation.description }}
          />
        </article>

        <Comment />
      </div>
    </Container>
  );
}

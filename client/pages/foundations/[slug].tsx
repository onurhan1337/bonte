import Head from "next/head";
import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import {
  getAllFoundations,
  getFoundationBySlug,
} from "../../lib/getFoundation";
import Comment from "../../components/comment";
import Container from "../../components/container";
import markdownToHtml from "../../lib/markdownToHtml";

export default function FoundationPage({
  foundation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (!router.isFallback && !foundation?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>{`${foundation.title} | My awesome blog`}</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header>
              <Image
                src={foundation.image}
                alt="Foundation"
                width={800}
                height={400}
              />
              <h1 className="text-4xl font-bold">{foundation.title}</h1>
              <p className="mt-2 text-justify text-xl">{foundation.excerpt}</p>
            </header>
            <div
              className="prose-base text-justify mt-10"
              dangerouslySetInnerHTML={{ __html: foundation.content }}
            />
          </article>

          <Comment />
        </div>
      )}
    </Container>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const foundation = getFoundationBySlug(params.slug, [
    "slug",
    "title",
    "image",
    "excerpt",
    "content",
  ]);
  const content = await markdownToHtml(foundation.content || "");

  return {
    props: {
      foundation: {
        ...foundation,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const foundation = getAllFoundations(["slug"]);

  return {
    paths: foundation.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}

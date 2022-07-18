import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next/types";
import { ParsedUrlQuery } from 'querystring';
import graphCms from '../lib/cms';

type SearchPageProps = {
};

const EntryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
}) => {
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
  const cannonicalUrl = `${process.env.URL_BASE}/search`;

  return (
    <div>
      <Head>
        <title>Site Search - {SITE_NAME}</title>
        <meta property="description" content="" />

        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content="Search for things here." />
        <meta property="og:url" content={cannonicalUrl} />
        <meta property="og:image" content="" />
        <meta property="og:image:alt" content="" />
        <meta property="og:type" content="article" />
      </Head>
      <main>
      </main>
    </div>
  );
};

export default EntryPage;

type Params = ParsedUrlQuery & {
  slug: string;
}

export const getStaticProps: GetStaticProps<SearchPageProps, Params> = async ({ params }) => {
  return {
    props: {
    },
  };
}
import { GraphQLClient, gql } from "graphql-request";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next/types";

type FAQResponse = {
  question: string;
  answer: string;

  createdTime: string;
  lastUpdated: string;
};

type FAQPageProps = {
  responses: FAQResponse[];
};

const EntryPage: NextPage<FAQPageProps> = ({ responses }) => {
  const SITE_NAME = process.env.SITE_NAME;
  const cannonicalUrl = `${process.env.URL_BASE}/chapter/`;

  const lastModified = responses.sort((q1, q2) => {
    return q1.lastUpdated >= q2.lastUpdated ? 1 : -1;
  })[0].lastUpdated;

  return (
    <div>
      <Head>
        <title>FAQ</title>
        <meta property="og:site_name" content={SITE_NAME} />
        <meta
          property="og:description"
          content="See frequently asked questions"
        />
        <meta property="og:url" content={cannonicalUrl} />
        <meta property="og:image" content="" />
        <meta property="og:image:alt" content="" />
        <meta property="og:type" content="article" />
        <meta property="article:modified_time" content={lastModified} />
        <meta property="article:author" content="Guide Editors" />
        <meta property="article:section" content="Frequently Asked Questions" />
        <meta property="article:tag" content="article" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "What is the return policy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": ""
                }
              }]
            }
          `}
        </script>
      </Head>
    </div>
  );
};

export default EntryPage;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHCMS_URL as string
);

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query Events {
      events {
        slug
      }
    }
  `;
  const data = await client.request(query);

  return {
    paths: data.events.map((event) => ({ params: { slug: event.slug } })),
    fallback: "blocking",
  };
};

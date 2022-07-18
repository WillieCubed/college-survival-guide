import Head from "next/head";
import Link from 'next/link';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next/types";
import { ParsedUrlQuery } from 'querystring';
import graphCms from '../../lib/cms';
import { UIEntrySummary } from '../../lib/presentation/content';

type EntryIndexPageProps = {
  entries: UIEntrySummary[];
};

const EntryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  entries
}) => {
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
  const cannonicalUrl = `${process.env.URL_BASE}/entries`;

  const entriesList = entries.map(({ slug, title }) => {
    const url = `/entries/${slug}`;
    return (
      <div key={slug}>
        <Link href={url}>
          <a>
            {title}
          </a>
        </Link>
      </div>
    );
  });

  const feedbackLink = '#feedback'; // TODO: Turn fedback into dialog. Maybe.
  const breadcrumbs = (
    <>
      <Link href="/">Guide</Link> &gt; <Link href="/faq">FAQ</Link>
    </>
  );

  return (
    <div>
      <Head>
        <title>Entry Index - {SITE_NAME}</title>
        <meta property="description" content="" />

        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content="See an index of all the content in this guide." />
        <meta property="og:url" content={cannonicalUrl} />
        <meta property="og:image" content="" />
        <meta property="og:image:alt" content="" />
        <meta property="og:type" content="article" />
      </Head>
      <main>
        <section id="intro" className="p-4 lg:p-8 bg-gray-300 dark:bg-gray-800 text-gray-50">
          <div className='mx-auto lg:max-w-4xl'>
            <h1>Get started with Guide.</h1>
          </div>
        </section>
        <section id="entries" className='mx-auto lg:max-w-4xl'>
          <div className="py-4">
            <div className="font-bold text-lg">See all the entries in the guide here.</div>
            {entriesList}
          </div>
        </section>
        {/* An index of all entries */}
      </main>
    </div>
  );
};

export default EntryPage;

type Params = ParsedUrlQuery & {
  slug: string;
}

export const getStaticProps: GetStaticProps<EntryIndexPageProps, Params> = async ({ params }) => {
  const { entries } = await graphCms.request(`
    query AllEntriesQuery() {
      entries {
        title
        slug
      }
    }
  `);

  return {
    props: {
      entries: entries,
    },
  };
}
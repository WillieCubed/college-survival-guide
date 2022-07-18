import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next/types";
import { ParsedUrlQuery } from 'querystring';
import graphCms from '../../lib/cms';

type Author = {
  name: string;
};

type Content = {
  html: string;
  markdown: string;
};

type EntryPageProps = {
  projectId: string;
  id: string;
  slug: string;
  title: string;
  description: string;
  authors: Author[];
  content: Content;
  chapterName: string;
  publishedTime: string;
  /**
   * Last modified time
   */
  updatedAt: string;
};

const EntryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projectId,
  id,
  slug,
  title,
  description,
  authors,
  content,
  chapterName,
  publishedTime,
  updatedAt,
}) => {
  const SITE_NAME = process.env.SITE_NAME;
  const cannonicalUrl = `${process.env.URL_BASE}/chapter/${slug}`;

  const lastUpdated = new Date(updatedAt).toLocaleString();

  const schemaId = '08306f93718a45198ab849bc710d83c4';
  const environment = 'master';
  const view = '916762b625a24ca193605ae3765b10bf';

  const editLink = `https://app.hygraph.com/${projectId}/${environment}/content/${schemaId}/view/${view}/${id}`;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={cannonicalUrl} />
        <meta property="og:image" content="" />
        <meta property="og:image:alt" content="" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={publishedTime} />
        <meta property="article:modified_time" content={lastUpdated} />
        <meta property="article:author" content={authors.map(({ name }) => name).join(" ")} />
        <meta property="article:section" content={chapterName} />
        <meta property="article:tag" content="article" />
      </Head>
      <main className='p-8'>
        <article
          className="max-w-5xl mx-auto p-16 bg-white dark:bg-gray-700 shadow-md rounded-md"
          itemScope
          itemType="https://schema.org/Article">
          <header className="pb-4">
            <div>
              {/* <div className="py-2 text-subtitle2">{breadcrumbs}</div> */}
            </div>
            <h1 className="text-headline3 font-semibold">{title}</h1>
            <div className="my-2 text-subtitle1 font-bold">Last updated {lastUpdated}</div>
            <div className='text-sm'>Edit this entry <a className="text-blue-400" href={editLink}>here</a>.</div>
          </header>
          <div dangerouslySetInnerHTML={{
            __html: content.html
          }} itemProp="articleBody"></div>
        </article>
        <section>
          {/* Navigation to and from next and previous entries */}
        </section>
      </main>
    </div>
  );
};

export default EntryPage;

type Params = ParsedUrlQuery & {
  slug: string;
}

export const getStaticProps: GetStaticProps<EntryPageProps, Params> = async ({ params }) => {
  const projectId = process.env.CMS_PROJECT_ID;
  const { slug: requestSlug } = params!;
  const { entry } = await graphCms.request(`
    query EntryPageQuery($slug: String) {
      entry(where: {
        slug: $slug
      }) {
        id
        title
        description
        content {
          html
          markdown
        }
        authors {
          name
        }
        chapter {
          title
        }
        updatedAt
      }
    }
  `,
    {
      slug: requestSlug,
    });

  console.log(entry);

  return {
    props: {
      projectId: projectId,
      ...entry,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { entries } = await graphCms.request(`
     {
      entries {
        slug
      }
     }
  `);
  const paths = entries.map(({ slug }: Params) => ({
    params: {
      slug: slug,
    }
  }));

  return {
    paths,
    fallback: false,
  };
}
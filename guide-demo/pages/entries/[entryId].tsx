import Head from "next/head";
import type { NextPage } from "next/types";

type EntryPageProps = {
  title: string;
  description: string;
  authors: string[];
  chapterName: string;
  publishedTime: string;
  lastModified: string;
};

const EntryPage: NextPage<EntryPageProps> = ({
  title,
  description,
  authors,
  chapterName,
  publishedTime,
  lastModified,
}) => {
  const SITE_NAME = process.env.SITE_NAME;
  const cannonicalUrl = `${process.env.URL_BASE}/chapter/`;

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
        <meta property="article:modified_time" content={lastModified} />
        <meta property="article:author" content={authors.join(" ")} />
        <meta property="article:section" content={chapterName} />
        <meta property="article:tag" content="article" />
      </Head>
    </div>
  );
};

export default EntryPage;

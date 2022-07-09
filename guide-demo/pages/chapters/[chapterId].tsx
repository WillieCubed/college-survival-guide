import { GraphQLClient, gql } from "graphql-request";
import Head from "next/head";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next/types";
import { useAuth } from "../../lib/auth";
import { Achievement, useAchievements } from "../../lib/progress";

type ChapterPageProps = {
  title: string;
  slug: string;
  featuredImage: string;
  chapterInfo: string;
  tasks: string[];
  tagline: string;
  pages: string[];
};

function AchievementItem({ title, status }: Achievement) {
  const done = status === "not_started";

  return (
    <li>
      <div>
        <div
          className={done ? "h-8 w-8 bg-green-500" : "h-8 w-8 bg-blue-500"}
        />
      </div>
    </li>
  );
}

function AchievementsProgressBar({ total, completed }) {
  return (
    <div>
      <div>{/* Progress bar */}</div>
      <div>
        {total}/{completed}
      </div>
    </div>
  );
}

interface AchievementsBlockProps {
  achievements: Achievement[];
}

function AchievementsBlock({ achievements }: AchievementsBlockProps) {
  const totalAchievements = 8;
  const completedAchievements = 2;

  const items = achievements.map((achievement) => {
    return <AchievementItem {...achievement} />;
  });

  return (
    <div>
      <AchievementsProgressBar
        total={totalAchievements}
        completed={completedAchievements}
      />
      <ul>{items}</ul>
    </div>
  );
}

const ChapterPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  title,
  description,
}) => {
  const SITE_NAME = process.env.SITE_NAME;
  const cannonicalUrl = `${process.env.URL_BASE}/chapter/`;

  const { user } = useAuth();

  const { achievements } = useAchievements(user.id);

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
      </Head>
      <main>
        <header>
          <div id="breadcrumbs"></div>
          <div id="share"></div>
        </header>
        <main>
          <AchievementsBlock achievements={achievements} />
        </main>
      </main>
    </div>
  );
};

export default ChapterPage;

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

  const paths = data.events.map((event) => ({ params: { slug: event.slug } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

import { serialize } from "next-mdx-remote/serialize";

interface IEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: {
    url: string;
  };
  description: string;
  source: { compiledSource: string };
}

export const getStaticProps: GetStaticProps<ChapterPageProps> = async ({
  params,
}: {
  params: IEvent;
}) => {
  const slug = params.slug as string;

  const query = gql`
    query Event($slug: String!) {
      event(where: { slug: $slug }) {
        id
        slug
        title
        date
        description
        image {
          url
        }
      }
    }
  `;
  const data: { event: IEvent | null } = await client.request(query, { slug });

  // Handle event slugs which don't exist in our CMS
  if (!data.event) {
    return {
      notFound: true,
    };
  }

  // Convert the Markdown into a compiled source used by MDX
  const source = await serialize(data.event.description);

  const chapter = {};

  // Provide Props to the Page Component
  return {
    // props: { event: { ...data.event, source } },
    props: {
      chapter,
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

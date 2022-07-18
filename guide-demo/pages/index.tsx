import type { NextPage } from "next";
import Head from "next/head";
import { CombinedSearchBar, useSearchBar } from "../components/search/SearchBar";

function generateTagline(): string {
  return "Your handbook to the next four years.";
}

const Home: NextPage = () => {
  const { handleSearch, handleInputUpdate, results, currentQuery } = useSearchBar();
  const tagline = generateTagline();

  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen">
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="p-8 max-w-4xl ">
          <div className="font-display font-bold opacity-80 text-3xl lg:text-5xl">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </div>
          <div className="mt-5 font-display text-2xl">{tagline}</div>
          <div className="py-4">
            <CombinedSearchBar onInputUpdate={handleInputUpdate} onSearch={handleSearch} results={results} currentQuery={currentQuery} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

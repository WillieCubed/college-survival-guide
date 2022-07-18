import Link from 'next/link';
import SearchBar, { useSearchBar } from './search/SearchBar';

interface SiteHeaderProps {
  showSearch: boolean;
}

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

export default function SiteHeader({ showSearch }: SiteHeaderProps) {
  const { handleInputUpdate, handleSearch, results, currentQuery } = useSearchBar();

  return (
    <header className="sticky top-0 shadow-md flex bg-gray-50 dark:bg-gray-700">
      <div className="flex-none p-4">
        <Link href="/">
          <a className="text-xl font-bold font-display">{SITE_NAME}</a>
          {/* TODO: Logo */}
        </Link>
      </div>
      {showSearch &&
        <div className="flex-auto mx-auto align-center max-w-2xl hover:max-w-3xl transition-all ease-in-out">
          <SearchBar onInputUpdate={handleInputUpdate} onSearch={handleSearch} results={results} currentQuery={currentQuery} />
        </div>
      }
      <nav className='p-4'>
        <ul className='align-center flex space-x-4'>
          <li className='text-xl font-bold font-display'>
            <Link href="/entries">
              Entries
            </Link>
          </li>
          <li className='text-xl font-bold font-display'>
            <Link href="/chapters">
              Chapters
            </Link>
          </li>
          <li className='text-xl font-bold font-display'>
            <Link href="/faq">
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
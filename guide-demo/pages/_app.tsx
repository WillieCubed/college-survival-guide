import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import SiteHeader from '../components/Header';
import '../styles/globals.css';
import '@fontsource/jost';
import '@fontsource/roboto';

function GuideApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSearch = router.pathname !== '/';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <SiteHeader showSearch={showSearch} />
      <Component {...pageProps} />
    </div>
  );
}

export default GuideApp

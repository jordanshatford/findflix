import '@fontsource/poppins';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import AppProgressBar from '@/components/AppProgressBar';
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <AppProgressBar color="#be123c" height={4} />
      <Navbar />
      <div className="w-full pt-20 relative overflow-y-auto bg-zinc-900">
        <Component {...pageProps} key={router.asPath} />
      </div>
    </>
  );
}

export default MyApp;

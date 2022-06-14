import '@fontsource/poppins';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import AppProgressBar from '@/components/AppProgressBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProgressBar color="#be123c" height={4} />
      <div className="w-full relative min-h-screen overflow-y-auto bg-zinc-900">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

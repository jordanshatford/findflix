import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import AppProgressBar from '@/components/AppProgressBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProgressBar color="#c50510" height={3} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

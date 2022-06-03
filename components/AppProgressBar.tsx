import router from 'next/router';
import nprogress from 'nprogress';
import { useEffect } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export function loadProgressBarForAxios(
  config?: Partial<nprogress.NProgressOptions>,
  instance: AxiosInstance = axios
) {
  let requestsCounter = 0;

  const setupStartProgress = () => {
    instance.interceptors.request.use((config) => {
      requestsCounter++;
      nprogress.start();
      return config;
    });
  };

  const setupUpdateProgress = () => {
    // Calculate percent
    const update = (e: ProgressEvent) =>
      nprogress.inc(Math.floor(e.loaded * 1.0) / e.total);
    instance.defaults.onDownloadProgress = update;
    instance.defaults.onUploadProgress = update;
  };

  const setupStopProgress = () => {
    const responseFunc = (response: AxiosResponse<any, any>) => {
      if (--requestsCounter === 0) {
        nprogress.done();
      }
      return response;
    };

    const errorFunc = (error: any) => {
      if (--requestsCounter === 0) {
        nprogress.done();
      }
      return Promise.reject(error);
    };

    instance.interceptors.response.use(responseFunc, errorFunc);
  };

  if (config) {
    nprogress.configure(config);
  }
  setupStartProgress();
  setupUpdateProgress();
  setupStopProgress();
}

interface Props {
  color?: string;
  startPosition?: number;
  stopDelayMs?: number;
  height?: number;
  options?: Partial<nprogress.NProgressOptions>;
  nonce?: string;
}

const AppProgressBar = ({
  color = '#c50510',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  options,
  nonce,
}: Props) => {
  // Load configuration to allow progressbar to appear during axios requests
  loadProgressBarForAxios(options);

  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (options) {
      nprogress.configure(options);
    }
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeEnd);
    router.events.on('routeChangeError', routeChangeEnd);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeEnd);
      router.events.off('routeChangeError', routeChangeEnd);
    };
  });

  const routeChangeStart = () => {
    nprogress.set(startPosition);
    nprogress.start();
  };

  const routeChangeEnd = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      nprogress.done(true);
    }, stopDelayMs);
  };

  return (
    <style nonce={nonce}>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
    `}</style>
  );
};

export default AppProgressBar;

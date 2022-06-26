import { ReactNode } from 'react';

interface Props {
  url: string;
  children?: ReactNode;
  additional?: ReactNode;
}

const MediaWatchPageContainer = ({ url, children, additional }: Props) => {
  return (
    <div className="flex flex-col gap-y-2 w-full mx-auto max-h-[85vh]">
      <div className="w-[98vw] md:w-[86vw] xl:w-[80vw] 2xl:w-[64vw] mx-auto px-2 mb-2">
        {url && (
          <iframe
            className="w-full aspect-video"
            frameBorder={0}
            allowFullScreen
            title={`Watch Player`}
            src={url}
          ></iframe>
        )}
        {children}
      </div>
      {additional}
    </div>
  );
};

export default MediaWatchPageContainer;

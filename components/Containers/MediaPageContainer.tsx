import { ReactNode } from 'react';

interface Props {
  poster: ReactNode;
  additional?: ReactNode;
  children?: ReactNode;
}

const MediaPageContainer = ({ poster, additional, children }: Props) => {
  return (
    <div className="w-full relative">
      <div
        className="w-full min-h-[90vh] flex items-end backdrop-blur-sm px-5 md:px-20 pb-14"
        style={{
          background: `linear-gradient(360deg, #18181B 30%, transparent)`,
        }}
      >
        <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start">
          {poster}
          <div className="pt-2 sm:pl-5 flex flex-col gap-y-2 justify-end w-full">
            {children}
          </div>
        </div>
      </div>
      {additional}
    </div>
  );
};

export default MediaPageContainer;

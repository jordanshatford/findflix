import type { NextPage } from 'next';
import Image from 'next/image';
import { ArrowSquareOut } from 'phosphor-react';

const TMDbPage: NextPage = () => {
  const tmdbLink = 'https://www.themoviedb.org/';
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <Image
          src="/tmdb.svg"
          layout="fixed"
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL="/tmdb.svg"
          alt="TMDb"
        />
      </div>
      <div className="flex justify-center text-zinc-200">
        <div className="flex flex-col items-center">
          <p className="text-center mx-2">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href={tmdbLink}
            className="mt-2 flex gap-x-1 justify-center align-middle cursor-pointer text-xl hover:text-red-700"
          >
            Link
            <ArrowSquareOut size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TMDbPage;

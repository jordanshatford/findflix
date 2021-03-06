import Link from 'next/link';
import { useRouter } from 'next/router';
import { MediaTypeEnum, MovieListEnum, TVShowListEnum } from '@/services/tmdb';
import { toReadableString } from '@/common/utils';

const MediaCategoryTabs = () => {
  const router = useRouter();
  return (
    <div className="px-0 py-2 flex justify-center">
      <div className="flex rounded-lg bg-zinc-800 p-1">
        {Object.keys(
          router.query.type === MediaTypeEnum.MOVIE
            ? MovieListEnum
            : TVShowListEnum
        )
          .map((c) => c.toLowerCase())
          .map((category) => (
            <Link
              href={{
                pathname: '/[type]/[id]/',
                query: {
                  type: router.query.type,
                  id: category,
                },
              }}
              key={category}
              passHref
            >
              <a
                className={`capitalize cursor-pointer flex justify-center self-center mx-0.5 p-2 rounded-lg text-center text-xs sm:text-sm md:text-base hover:bg-zinc-700 hover:text-white ${
                  router.query.id === category
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-100'
                }`}
              >
                {toReadableString(category)}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MediaCategoryTabs;

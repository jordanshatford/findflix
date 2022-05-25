import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  IMAGE_BASE_URL,
  MovieDbMediaType,
  getMediaCreationDate,
  type MovieResult,
  type TVShowResult,
} from '@/services/movie-db';
import { convertTitleToURLSafe } from '@/utilities/urls';

interface Props {
  item: Partial<MovieResult & TVShowResult>;
  type: MovieDbMediaType;
}

const PosterHoverInfo = ({ item, type }: Props) => {
  return (
    <div className="py-4 px-3 w-full h-full bottom-0 hidden absolute group-hover:flex bg-[#0d0d0dbb] backdrop-blur-sm justify-end flex-col">
      <p className="font-semibold text-sm text-[#f2f2f2]">{item.title}</p>
      <p className="line-clamp-3 text-xs font-light text-[#cacaca]">
        {getMediaCreationDate(item, type).getFullYear()}
      </p>
      <p className="line-clamp-3 text-xs font-light text-[#cacaca]">
        {item.overview}
      </p>
      {new Date() > getMediaCreationDate(item, type) ? (
        <Link
          href={{
            pathname: '/movies/[id]/[title]/watch',
            query: { id: item.id, title: convertTitleToURLSafe(item.title) },
          }}
        >
          <div className="text-white text-sm py-2 px-3 rounded-md mt-3 w-max bg-gray-600">
            Watch Now
          </div>
        </Link>
      ) : null}
    </div>
  );
};

const Poster = ({ item, type }: Props) => {
  return (
    <>
      <Link
        href={{
          pathname: '/movies/[id]/[title]',
          query: { id: item.id, title: convertTitleToURLSafe(item.title) },
        }}
        passHref
      >
        <a className="mx-2 mb-3 group inline-block">
          <motion.div whileHover={{ scale: 1.05 }}>
            <div className="w-44 h-72 overflow-hidden relative rounded-md bg-gray-500">
              <Image
                src={`${IMAGE_BASE_URL}/t/p/w780${item.poster_path}`}
                layout="fill"
                placeholder="blur"
                objectFit="cover"
                blurDataURL={`${IMAGE_BASE_URL}/t/p/w780${item.poster_path}`}
                alt={type === 'movie' ? item.title : item.name}
              />
              <PosterHoverInfo item={item} type={type} />
            </div>
          </motion.div>
        </a>
      </Link>
    </>
  );
};

export default Poster;

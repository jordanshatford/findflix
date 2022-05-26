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
import { toURLSafe } from '@/utilities/urls';

interface Props {
  item: Partial<MovieResult & TVShowResult>;
  type: MovieDbMediaType;
  hoverable?: boolean;
}

const PosterHoverInfo = ({ item, type }: Props) => {
  return (
    <div className="py-4 px-3 w-full h-full bottom-0 hidden absolute group-hover:flex bg-zinc-800 bg-opacity-80 backdrop-blur-sm justify-end flex-col">
      <p className="font-semibold text-sm text-[#f2f2f2]">{item.title}</p>
      <p className="line-clamp-3 text-xs font-light text-[#cacaca]">
        {getMediaCreationDate(item, type).getFullYear()}
      </p>
      <p className="line-clamp-3 text-xs font-light text-[#cacaca]">
        {item.overview}
      </p>
      {new Date() > getMediaCreationDate(item, type) && (
        <Link
          href={{
            pathname: `/[type]/[id]/[title]/watch`,
            query: {
              type,
              id: item.id,
              title: toURLSafe(item.title),
            },
          }}
        >
          <div className="text-white text-sm py-2 px-3 rounded-md mt-3 w-max bg-zinc-600">
            Watch Now
          </div>
        </Link>
      )}
    </div>
  );
};

const Poster = ({ item, type, hoverable = true }: Props) => {
  return (
    <>
      <Link
        href={{
          pathname: '/[type]/[id]/[title]',
          query: {
            type,
            id: item.id,
            title: toURLSafe(item.title),
          },
        }}
        passHref
      >
        <a className="mx-2 mb-3 group inline-block">
          <motion.div whileHover={{ scale: hoverable ? 1.05 : 1 }}>
            <div className="w-40 h-60 overflow-hidden relative rounded-md bg-zinc-800 bg-opacity-80 backdrop-blur-sm">
              <Image
                src={`${IMAGE_BASE_URL}/t/p/w780${item.poster_path}`}
                layout="fill"
                placeholder="blur"
                objectFit="cover"
                blurDataURL={`${IMAGE_BASE_URL}/t/p/w780${item.poster_path}`}
                alt={type === 'movie' ? item.title : item.name}
              />
              {hoverable && <PosterHoverInfo item={item} type={type} />}
            </div>
          </motion.div>
        </a>
      </Link>
    </>
  );
};

export default Poster;

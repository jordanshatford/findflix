import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'phosphor-react';
import tmdb, { MediaTypeEnum, Movie, TVShow } from '@/services/tmdb';
import { toURLSafe } from '@/utilities/index';
import BasicPoster from '@/components/BasicPoster';

interface Props {
  item: Partial<Movie & TVShow>;
  type: MediaTypeEnum;
  isHoverable?: boolean;
}

const MediaPosterHoverInfo = ({ item, type }: Props) => {
  const creationDate = tmdb.getMediaCreationDate(item, type);
  return (
    <div className="py-4 px-3 w-full h-full hidden absolute group-hover:flex bg-zinc-800 bg-opacity-80 backdrop-blur-sm justify-end flex-col">
      <p className="font-semibold text-sm text-white">
        {type === MediaTypeEnum.MOVIE ? item.title : item.name}
      </p>
      <p className="line-clamp-3 text-xs font-light text-zinc-400">
        {creationDate ? creationDate.getFullYear() : '???'}
      </p>
      <p className="line-clamp-3 text-xs font-light text-zinc-400">
        {item.overview}
      </p>
    </div>
  );
};

const MediaPoster = ({ item, type, isHoverable = true }: Props) => {
  const posterImageUrl = tmdb.getImageLink(item.poster_path);
  return (
    <Link
      href={{
        pathname: '/[type]/[id]/[name]',
        query: {
          type,
          id: item.id,
          name: toURLSafe(
            type === MediaTypeEnum.MOVIE ? item.title : item.name
          ),
        },
      }}
      passHref
    >
      <a className="group">
        <motion.div
          whileHover={{ scale: isHoverable ? 1.05 : 1 }}
          className="flex justify-center"
        >
          <BasicPoster
            image={posterImageUrl}
            alt={type === MediaTypeEnum.MOVIE ? item.title : item.name}
          >
            {isHoverable && <MediaPosterHoverInfo item={item} type={type} />}
          </BasicPoster>
        </motion.div>
      </a>
    </Link>
  );
};

export default MediaPoster;

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import tmdb, { Episode, MediaTypeEnum, Season, TVShow } from '@/services/tmdb';
import { toReadableDate, toURLSafe } from '@/common/utils';

interface Props {
  show: TVShow;
  season: Season;
  episode: Episode;
  isHoverable?: boolean;
}

const EpisodePoster = ({
  show,
  season,
  episode,
  isHoverable = true,
}: Props) => {
  const imageUrl = tmdb.getImageLink(episode?.still_path ?? show.backdrop_path);
  return (
    <Link
      href={{
        pathname: '/[type]/[id]/[name]/season/[seasonId]/episode/[episodeId]',
        query: {
          type: MediaTypeEnum.TV_SHOW,
          id: show.id,
          name: toURLSafe(show.name),
          seasonId: season.season_number,
          episodeId: episode.episode_number,
        },
      }}
      passHref
    >
      <a className="group">
        <motion.div
          whileHover={{ scale: isHoverable ? 1.05 : 1 }}
          className="flex justify-center"
        >
          <div className="flex justify-center">
            <div className="h-40 aspect-video overflow-hidden relative rounded-lg bg-zinc-800 bg-opacity-80 backdrop-blur-sm">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  layout="fill"
                  placeholder="blur"
                  objectFit="cover"
                  blurDataURL={imageUrl}
                  alt={`Episode ${episode.episode_number}`}
                />
              )}
              <div className="py-4 px-3 w-full h-full absolute flex bg-zinc-800 bg-opacity-50 hover:bg-opacity-80 backdrop-blur-sm justify-end flex-col">
                <p className="font-semibold text-sm text-white">
                  {episode.name}
                </p>
                <p className="line-clamp-3 text-xs font-light text-zinc-400">
                  {`S${season.season_number}E${episode.episode_number}`}
                </p>
                <p className="line-clamp-3 text-xs font-light text-zinc-400">
                  {toReadableDate(tmdb.toDate(episode.air_date))}
                </p>
                {isHoverable && (
                  <div className="hidden group-hover:flex">
                    <p className="line-clamp-3 text-xs font-light text-zinc-400">
                      {episode.overview
                        ? episode.overview
                        : 'No overview available.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </a>
    </Link>
  );
};

export default EpisodePoster;

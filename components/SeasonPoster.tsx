import Link from 'next/link';
import { motion } from 'framer-motion';
import tmdb, { MediaTypeEnum, Season, TVShow } from '@/services/tmdb';
import { toURLSafe, toReadableDate } from '@/utilities/index';
import BasicPoster from '@/components/BasicPoster';

interface Props {
  show: TVShow;
  season: Season;
  isHoverable?: boolean;
}

const SeasonPosterHoverInfo = ({ show, season }: Props) => {
  const airDate = tmdb.toDate(season.air_date);
  return (
    <div className="py-4 px-3 w-full h-full hidden absolute group-hover:flex bg-zinc-800 bg-opacity-80 backdrop-blur-sm justify-end flex-col">
      <p className="font-semibold text-sm text-white">{show.name}</p>
      <p className="line-clamp-3 text-xs font-light text-zinc-400">
        Season {season.season_number}
      </p>
      <p className="line-clamp-3 text-xs font-light text-zinc-400">
        {toReadableDate(airDate)}
      </p>
    </div>
  );
};

const Poster = ({ show, season, isHoverable = true }: Props) => {
  const posterImageUrl = tmdb.getImageLink(season.poster_path);
  return (
    <Link
      href={{
        pathname: '/[type]/[id]/[name]/season/[seasonNumber]',
        query: {
          type: MediaTypeEnum.TV_SHOW,
          id: show.id,
          name: toURLSafe(show.name),
          seasonNumber: season.season_number,
        },
      }}
      passHref
    >
      <a className="group">
        <motion.div
          whileHover={{ scale: isHoverable ? 1.05 : 1 }}
          className="flex justify-center"
        >
          <BasicPoster image={posterImageUrl} alt={show.name}>
            {isHoverable && (
              <SeasonPosterHoverInfo show={show} season={season} />
            )}
          </BasicPoster>
        </motion.div>
      </a>
    </Link>
  );
};

export default Poster;

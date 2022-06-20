import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Calendar, Play, Star } from 'phosphor-react';
import tmdb, {
  MediaTypeEnum,
  DetailedTVShow,
  Season,
  Episode,
} from '@/services/tmdb';
import BasicPoster from '@/components/BasicPoster';
import { toReadableDate, toURLSafe } from '@/utilities/index';

interface Props {
  show: DetailedTVShow;
  season: Season;
  episode: Episode;
  availableToWatch?: boolean;
}

const EpisodeDetailPage: NextPage<Props> = ({
  show,
  season,
  episode,
  availableToWatch = false,
}: Props) => {
  const airDate = tmdb.toDate(episode.air_date);
  return (
    <div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${tmdb.getImageLink(
            episode.still_path,
            'original'
          )})`,
        }}
      ></div>
      <div className="w-full relative">
        <div
          className="w-full min-h-screen flex items-end backdrop-blur-sm px-5 md:px-20 pb-14"
          style={{
            background: `linear-gradient(360deg, #18181B 30%, transparent)`,
          }}
        >
          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start">
            <BasicPoster
              image={tmdb.getImageLink(season.poster_path)}
              alt={`${season.name} ${season.season_number}`}
            />
            <div className="pt-2 sm:pl-5 flex flex-col justify-end w-full">
              <h2 className="font-semibold text-white text-3xl mb-2">
                {show.name}
              </h2>
              <p className="text-sm text-zinc-300">
                S{season.season_number} E{episode.episode_number} -{' '}
                {episode.name}
              </p>
              <div className="mt-2">
                <div className="flex items-center text-xs text-zinc-300">
                  {airDate && (
                    <>
                      <Calendar size={20} weight="fill" />
                      <span className="ml-1">{toReadableDate(airDate)}</span>
                    </>
                  )}
                  <Star className="ml-2" size={20} weight="fill" />
                  <span className="ml-1">{episode.vote_average}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-justify text-zinc-300">
                {episode.overview ? episode.overview : 'No overview available.'}
              </p>
              {availableToWatch && (
                <Link
                  href={{
                    pathname: `/[type]/[id]/[name]/season/[seasonId]/episode/[episodeId]/watch`,
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
                  <a className="flex items-center text-white text-sm py-2 px-3 rounded-lg mt-3 w-max bg-zinc-600">
                    <Play size={15} weight="fill" className="mr-1" />
                    Watch Now
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id, type, seasonId, episodeId } = params as {
    id: string;
    type: MediaTypeEnum;
    seasonId: string;
    episodeId: string;
  };
  if (type !== MediaTypeEnum.TV_SHOW) {
    return { notFound: true };
  }
  try {
    const show = await tmdb.getTVShowDetails(id);
    const season = await tmdb.getTVShowSeason(id, seasonId);
    const eNum = parseInt(episodeId, 10);
    const episode = season?.episodes?.find((e) => e.episode_number === eNum);
    if (episode === undefined) {
      return { notFound: true };
    }
    const airDate = tmdb.toDate(episode.air_date);
    const availableToWatch =
      airDate && new Date() > airDate && tmdb.hasWatchLinkAvailable();
    return { props: { show, season, episode, availableToWatch } };
  } catch (e) {
    return { notFound: true };
  }
};

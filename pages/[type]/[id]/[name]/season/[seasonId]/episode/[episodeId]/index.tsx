import type { GetServerSideProps, NextPage } from 'next';
import tmdb, {
  MediaTypeEnum,
  DetailedTVShow,
  Season,
  Episode,
} from '@/services/tmdb';
import { SeasonPoster } from '@/components/Posters';
import { toURLSafe } from '@/common/utils';
import MediaStats from '@/components/MediaStats';
import MetaHead from '@/components/MetaHead';
import BackdropImage from '@/components/BackdropImage';
import MediaTags from '@/components/MediaTags';
import { EpisodesContainer, SeasonsContainer } from '@/components/Containers';

interface Props {
  show: DetailedTVShow;
  season: Season;
  episode: Episode;
}

const EpisodeDetailPage: NextPage<Props> = ({
  show,
  season,
  episode,
}: Props) => {
  return (
    <>
      <MetaHead
        title={`S${season.season_number}E${episode.episode_number} - ${show.name}`}
      />
      <div>
        <BackdropImage
          src={tmdb.getImageLink(
            episode?.still_path ?? show.backdrop_path,
            'original'
          )}
        />
        <div className="w-full relative">
          <div
            className="w-full min-h-[95vh] flex items-end backdrop-blur-sm px-5 md:px-20 pb-14"
            style={{
              background: `linear-gradient(360deg, #18181B 30%, transparent)`,
            }}
          >
            <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start">
              <SeasonPoster show={show} season={season} isHoverable={false} />
              <div className="pt-2 sm:pl-5 flex flex-col gap-y-2 justify-end w-full">
                <h2 className="font-semibold text-white text-3xl">
                  {show.name}
                </h2>
                <p className="text-sm text-zinc-300">
                  S{season.season_number} E{episode.episode_number} -{' '}
                  {episode.name}
                </p>
                <MediaStats
                  airDate={tmdb.toDate(episode.air_date)}
                  voteAverage={episode.vote_average}
                />
                <MediaTags values={show?.genres} />
                <p className="text-sm text-justify text-zinc-300">
                  {episode.overview
                    ? episode.overview
                    : 'No overview available.'}
                </p>
              </div>
            </div>
          </div>
          <EpisodesContainer show={show} season={season} />
          <SeasonsContainer show={show} />
        </div>
      </div>
    </>
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
    const episodeNumber = parseInt(episodeId, 10);
    const episode = season?.episodes?.find(
      (e) => e.episode_number === episodeNumber
    );

    if (episode === undefined) {
      return {
        redirect: {
          destination: `/${MediaTypeEnum.TV_SHOW}/${show.id}/${toURLSafe(
            show.name
          )}/season/${season.season_number}`,
          permanent: true,
        },
      };
    }
    return {
      props: { show, season, episode },
    };
  } catch (e) {
    return { notFound: true };
  }
};

import type { GetServerSideProps, NextPage } from 'next';
import tmdb, { MediaTypeEnum, DetailedTVShow, Season } from '@/services/tmdb';
import { SeasonPoster } from '@/components/Posters';
import { SeasonsContainer } from '@/components/Containers';
import MediaStats from '@/components/MediaStats';
import MediaTags from '@/components/MediaTags';
import MetaHead from '@/components/MetaHead';
import BackdropImage from '@/components/BackdropImage';
import { toURLSafe } from '@/common/utils';

interface Props {
  show: DetailedTVShow;
  season: Season;
}

const SeasonDetailPage: NextPage<Props> = ({ show, season }: Props) => {
  return (
    <>
      <MetaHead title={`S${season.season_number} - ${show.name}`} />
      <div>
        <BackdropImage
          src={tmdb.getImageLink(show.backdrop_path, 'original')}
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
                  Season {season.season_number}
                </p>
                <MediaStats
                  airDate={tmdb.toDate(season.air_date)}
                  voteAverage={show.vote_average}
                  episodes={season.episodes?.length ?? 0}
                />
                <MediaTags values={show?.genres} />
                <p className="text-sm text-justify text-zinc-300">
                  {season.overview ? show.overview : 'No overview available.'}
                </p>
              </div>
            </div>
          </div>
          <SeasonsContainer show={show} />
        </div>
      </div>
    </>
  );
};

export default SeasonDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id, type, seasonId } = params as {
    id: string;
    type: MediaTypeEnum;
    seasonId: string;
  };
  if (type !== MediaTypeEnum.TV_SHOW) {
    return { notFound: true };
  }
  try {
    const show = await tmdb.getTVShowDetails(id);
    try {
      const season = await tmdb.getTVShowSeason(id, seasonId);
      return { props: { show, season } };
    } catch (e) {
      return {
        redirect: {
          destination: `/${MediaTypeEnum.TV_SHOW}/${show.id}/${toURLSafe(
            show.name
          )}`,
          permanent: true,
        },
      };
    }
  } catch (e) {
    return { notFound: true };
  }
};

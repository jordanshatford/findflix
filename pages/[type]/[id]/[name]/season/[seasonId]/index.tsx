import type { GetServerSideProps, NextPage } from 'next';
import { Calendar, MonitorPlay } from 'phosphor-react';
import tmdb, { MediaTypeEnum, DetailedTVShow, Season } from '@/services/tmdb';
import SeasonPoster from '@/components/SeasonPoster';
import MediaStats from '@/components/MediaStats';
import { toReadableDate } from '@/utilities/index';
import Tag from '@/components/Tag';

interface Props {
  show: DetailedTVShow;
  season: Season;
}

const SeasonDetailPage: NextPage<Props> = ({ show, season }: Props) => {
  const airDate = tmdb.toDate(season.air_date);
  return (
    <div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${tmdb.getImageLink(
            show.backdrop_path,
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
            <SeasonPoster show={show} season={season} isHoverable={false} />
            <div className="pt-2 sm:pl-5 flex flex-col gap-y-2 justify-end w-full">
              <h2 className="font-semibold text-white text-3xl">
                {show.name}
              </h2>
              <p className="text-sm text-zinc-300">
                Season {season.season_number}
              </p>
              <MediaStats
                airDate={airDate}
                voteAverage={show.vote_average}
                episodes={season.episodes?.length ?? 0}
              />
              <div className="flex flex-wrap">
                {show?.genres?.map((genre) => (
                  <Tag key={genre.id} text={genre.name} />
                ))}
              </div>
              <p className="text-sm text-justify text-zinc-300">
                {season.overview ? show.overview : 'No overview available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    const season = await tmdb.getTVShowSeason(id, seasonId);
    return { props: { show, season } };
  } catch (e) {
    return { notFound: true };
  }
};

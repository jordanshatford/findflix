import type { GetServerSideProps, NextPage } from 'next';
import { Calendar, MonitorPlay } from 'phosphor-react';
import tmdb, { MediaTypeEnum, DetailedTVShow, Season } from '@/services/tmdb';
import BasicPoster from '@/components/BasicPoster';
import { toReadableDate } from '@/utilities/index';

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
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start">
            <BasicPoster
              image={tmdb.getImageLink(season.poster_path)}
              alt={`${season.name} ${season.season_number}`}
            />
            <div className="pt-2 sm:pl-5 flex flex-col justify-end w-full">
              <h2 className="font-semibold text-white text-3xl mb-2">
                {show.name}
              </h2>
              <p className="text-sm text-zinc-300">
                Season {season.season_number}
              </p>
              <div className="mt-2">
                <div className="flex items-center text-xs text-zinc-300">
                  {airDate && (
                    <>
                      <Calendar size={20} weight="fill" />
                      <span className="ml-1">{toReadableDate(airDate)}</span>
                    </>
                  )}
                  <MonitorPlay className="ml-2" size={20} weight="fill" />
                  <span className="ml-1">
                    {season.episodes?.length ?? 0} episode(s)
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-justify text-zinc-300">
                {season.overview}
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

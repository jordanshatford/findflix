import type { GetServerSideProps, NextPage } from 'next';
import tmdb, { MediaTypeEnum, DetailedTVShow, Season } from '@/services/tmdb';
import { SeasonPoster } from '@/components/Posters';
import {
  SeasonsContainer,
  EpisodesContainer,
  RelatedMediaContainer,
} from '@/components/Containers';
import MediaStats from '@/components/MediaStats';
import MediaTags from '@/components/MediaTags';
import MetaHead from '@/components/MetaHead';
import BackdropImage from '@/components/BackdropImage';
import { toURLSafe } from '@/common/utils';
import { Text, Title } from '@/components/Typography';

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
                <Title>{show.name}</Title>
                <Text>Season {season.season_number}</Text>
                <MediaStats
                  airDate={tmdb.toDate(season.air_date)}
                  voteAverage={show.vote_average}
                  episodes={season.episodes?.length ?? 0}
                />
                <MediaTags values={show?.genres} />
                <Text>
                  {season.overview ? season.overview : 'No overview available.'}
                </Text>
              </div>
            </div>
          </div>
          <EpisodesContainer show={show} season={season} />
          <SeasonsContainer show={show} />
          <RelatedMediaContainer
            title="Similiar:"
            results={show.similar}
            type={MediaTypeEnum.TV_SHOW}
          />
          <RelatedMediaContainer
            title="Recommendations:"
            results={show.recommendations}
            type={MediaTypeEnum.TV_SHOW}
          />
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

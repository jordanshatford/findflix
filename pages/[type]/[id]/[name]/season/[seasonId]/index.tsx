import type { GetServerSideProps, NextPage } from 'next';
import tmdb, { MediaTypeEnum, DetailedTVShow, Season } from '@/services/tmdb';
import { SeasonPoster } from '@/components/Posters';
import {
  SeasonsContainer,
  EpisodesContainer,
  RelatedMediaContainer,
  MediaPageContainer,
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
      <BackdropImage src={tmdb.getImageLink(show.backdrop_path, 'original')} />
      <MediaPageContainer
        poster={
          <SeasonPoster show={show} season={season} isHoverable={false} />
        }
        additional={
          <>
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
          </>
        }
      >
        <Title>{show.name}</Title>
        <Text>{season.name}</Text>
        <MediaStats
          airDate={tmdb.toDate(season.air_date)}
          voteAverage={show.vote_average}
          episodes={season.episodes?.length ?? 0}
        />
        <MediaTags values={show?.genres} />
        <Text>
          {season.overview ? season.overview : 'No overview available.'}
        </Text>
      </MediaPageContainer>
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

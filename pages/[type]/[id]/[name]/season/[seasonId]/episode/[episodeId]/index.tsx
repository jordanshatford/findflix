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
import {
  EpisodesContainer,
  SeasonsContainer,
  MediaPageContainer,
} from '@/components/Containers';
import { Text, Title } from '@/components/Typography';

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
      <BackdropImage
        src={tmdb.getImageLink(
          episode?.still_path ?? show.backdrop_path,
          'original'
        )}
      />
      <MediaPageContainer
        poster={
          <SeasonPoster show={show} season={season} isHoverable={false} />
        }
        additional={
          <>
            <EpisodesContainer show={show} season={season} />
            <SeasonsContainer show={show} />
          </>
        }
      >
        <Title>{show.name}</Title>
        <Text>
          S{season.season_number} E{episode.episode_number} - {episode.name}
        </Text>
        <MediaStats
          airDate={tmdb.toDate(episode.air_date)}
          voteAverage={episode.vote_average}
        />
        <MediaTags values={show?.genres} />
        <Text>
          {episode.overview ? episode.overview : 'No overview available.'}
        </Text>
      </MediaPageContainer>
    </>
  );
};

export default EpisodeDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const type = params?.type as MediaTypeEnum;
  const seasonId = params?.seasonId as string;
  const episodeId = params?.episodeId as string;
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

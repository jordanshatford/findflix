import type { GetServerSideProps, NextPage } from 'next';
import tmdb, {
  MediaTypeEnum,
  DetailedTVShow,
  Season,
  Episode,
} from '@/services/tmdb';
import {
  MediaWatchPageContainer,
  EpisodesContainer,
  SeasonsContainer,
} from '@/components/Containers';
import MetaHead from '@/components/MetaHead';
import MediaStats from '@/components/MediaStats';
import { Title, Text } from '@/components/Typography';

interface Props {
  show: DetailedTVShow;
  season: Season;
  episode: Episode;
  watchLink: string;
}

const EpisodeWatchPage: NextPage<Props> = ({
  show,
  season,
  episode,
  watchLink,
}: Props) => {
  return (
    <>
      <MetaHead
        title={`Watch S${season.season_number}E${episode.episode_number} - ${show.name}`}
      />
      <MediaWatchPageContainer
        url={watchLink}
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
          seasons={show.number_of_seasons}
          episodes={season.episodes?.length ?? 0}
        />
        <Text>
          {episode.overview ? episode.overview : 'No overview available.'}
        </Text>
      </MediaWatchPageContainer>
    </>
  );
};

export default EpisodeWatchPage;

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
    const eNum = parseInt(episodeId, 10);
    const episode = season?.episodes?.find((e) => e.episode_number === eNum);
    if (episode === undefined || !tmdb.isWatchable(episode)) {
      return { notFound: true };
    }
    const watchLink = tmdb.getTVShowEpisodeWatchLink(show, episode);
    return {
      props: {
        show,
        season,
        episode,
        watchLink,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};

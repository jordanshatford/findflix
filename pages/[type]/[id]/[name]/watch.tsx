import type { GetServerSideProps, NextPage } from 'next';
import tmdb, {
  MediaTypeEnum,
  DetailedMovie,
  DetailedTVShow,
} from '@/services/tmdb';
import { MediaWatchPageContainer } from '@/components/Containers';
import MetaHead from '@/components/MetaHead';
import MediaStats from '@/components/MediaStats';
import { Title, Text } from '@/components/Typography';

interface Props {
  item: Partial<DetailedMovie & DetailedTVShow>;
  watchLink: string;
}

const MediaWatchPage: NextPage<Props> = ({ item, watchLink }: Props) => {
  return (
    <>
      <MetaHead title={`Watch ${item.title}`} />
      <MediaWatchPageContainer url={watchLink}>
        <Title>{item.title}</Title>
        <MediaStats
          airDate={tmdb.toDate(item.release_date)}
          voteAverage={item.vote_average}
          duration={item.runtime}
        />
        <Text>{item.overview}</Text>
      </MediaWatchPageContainer>
    </>
  );
};

export default MediaWatchPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const type = params?.type as MediaTypeEnum;
  if (type !== MediaTypeEnum.MOVIE) {
    return { notFound: true };
  }
  try {
    const movie = await tmdb.getMovieDetails(id);
    if (!tmdb.isWatchable(movie)) {
      return { notFound: true };
    }
    const watchLink = tmdb.getMovieWatchLink(movie);
    return {
      props: { item: movie, watchLink },
    };
  } catch (e) {
    return { notFound: true };
  }
};

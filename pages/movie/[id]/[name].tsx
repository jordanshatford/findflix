import type { GetServerSideProps, NextPage } from 'next';
import moviedb, { MediaTypeEnum, type DetailedMovie } from '@/services/moviedb';
import DetailedMediaInfo from '@/components/DetailedMediaInfo';

interface Props {
  movie: DetailedMovie;
  availableToWatch: boolean;
}

const MoviePage: NextPage<Props> = ({
  movie,
  availableToWatch = false,
}: Props) => {
  return (
    <DetailedMediaInfo
      item={movie}
      type={MediaTypeEnum.MOVIE}
      availableToWatch={availableToWatch}
    />
  );
};

export default MoviePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const movie = await moviedb.getMovieDetails(id);
  const creationDate = moviedb.getMediaCreationDate(movie, MediaTypeEnum.MOVIE);
  const availableToWatch =
    creationDate &&
    new Date() > creationDate &&
    moviedb.hasWatchLinkAvailable();
  return { props: { movie, availableToWatch } };
};

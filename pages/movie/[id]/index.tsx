import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moviedb, {
  type MovieDBPagedResults,
  type MovieResult,
  MovieListEnum,
  MovieDBMediaTypeEnum,
} from '@/services/moviedb';
import Poster from '@/components/Poster';

interface Props {
  results: MovieDBPagedResults<MovieResult>;
}

const PopularMovies: NextPage<Props> = ({ results }: Props) => {
  const router = useRouter();
  const list = router.query.id as MovieListEnum;

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [movies, setMovies] = useState<MovieResult[]>([]);

  useEffect(() => {
    setMovies(results.results);
    setTotalPages(results.total_pages);
    setTotalResults(results.total_results);
    setPage(results.page);
  }, [results]);

  const getNextPage = async () => {
    setLoading(true);
    const response = await axios.get<{
      error: boolean;
      data: MovieDBPagedResults<MovieResult>;
    }>(`/api/movie/${list}`, { params: { page: page + 1 } });
    if (!response.data.error) {
      setMovies([...movies, ...response.data.data.results]);
      setPage(response.data.data.page);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>
        {list} Movies - {page} of {totalPages} with {totalResults} result
      </h1>
      <div>
        {movies.map((movie) => (
          <div className="inline-block mx-2 mb-2" key={movie.id}>
            <Poster item={movie} type={MovieDBMediaTypeEnum.MOVIE} />
          </div>
        ))}
      </div>
      <button onClick={getNextPage}>
        {loading ? 'Loading' : 'More Results'}
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // The id in this case is actually the name of the list
  const list = params?.id as MovieListEnum;
  if (!moviedb.isValidList(MovieDBMediaTypeEnum.MOVIE, list)) {
    return { notFound: true };
  }
  const results = await moviedb.getMovieListPagedResults(list);
  return { props: { results } };
};

export default PopularMovies;

import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moviedb, {
  type PagedResults,
  type Movie,
  type TVShow,
  MovieListEnum,
  MediaTypeEnum,
  TVShowListEnum,
} from '@/services/moviedb';
import Poster from '@/components/Poster';

interface Props {
  results: PagedResults<Partial<Movie & TVShow>>;
}

const PopularMovies: NextPage<Props> = ({ results }: Props) => {
  const router = useRouter();
  const type = router.query.type as MediaTypeEnum;
  const list = router.query.id as MovieListEnum;

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [items, setItems] = useState<Partial<Movie & TVShow>[]>([]);

  useEffect(() => {
    setItems(results.results);
    setTotalPages(results.total_pages);
    setTotalResults(results.total_results);
    setPage(results.page);
  }, [results]);

  const getNextPage = async () => {
    setLoading(true);
    const response = await axios.get<{
      error: boolean;
      data: PagedResults<Movie>;
    }>(`/api/${type}/${list}`, { params: { page: page + 1 } });
    if (!response.data.error) {
      setItems([...items, ...response.data.data.results]);
      setPage(response.data.data.page);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white capitalize">
        {list} {type === MediaTypeEnum.MOVIE ? 'Movies' : 'TV Shows'}
      </h1>
      <div className="flex flex-wrap justify-center">
        {items.map((item) => (
          <div key={item.id} className="m-2">
            <Poster item={item} type={type} />
          </div>
        ))}
      </div>
      <button
        onClick={getNextPage}
        className="flex items-center text-white text-sm py-2 px-3 rounded-lg mt-3 w-max bg-zinc-600"
      >
        {loading ? 'Loading' : 'More Results'}
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const type = params?.type as MediaTypeEnum;

  if (type === MediaTypeEnum.MOVIE) {
    // The id in this case is actually the name of the list
    const list = params?.id as MovieListEnum;
    if (!moviedb.isValidList(type, list)) {
      return { notFound: true };
    }
    const results = await moviedb.getMovieListPagedResults(list);
    return { props: { results } };
  } else if (type === MediaTypeEnum.TV_SHOW) {
    // The id in this case is actually the name of the list
    const list = params?.id as TVShowListEnum;
    if (!moviedb.isValidList(type, list)) {
      return { notFound: true };
    }
    const results = await moviedb.getTVShowListPagedResults(list);
    return { props: { results } };
  }
  return { notFound: true };
};

export default PopularMovies;

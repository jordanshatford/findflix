import type { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moviedb, { PagedResults, ListItem } from '@/services/moviedb';
import Poster from '@/components/Poster';

interface Props {
  results: PagedResults<ListItem>;
}

const PopularMovies: NextPage<Props> = ({ results }: Props) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [items, setItems] = useState<ListItem[]>([]);

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
      data: PagedResults<ListItem>;
    }>('/api/favourites', { params: { page: page + 1 } });
    if (!response.data.error) {
      setItems([...items, ...response.data.data.results]);
      setPage(response.data.data.page);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>
        Favourite Movies - {page} of {totalPages} with {totalResults} result
      </h1>
      <div>
        {items.map((item) => (
          <div className="inline-block mx-2 mb-2" key={item.id}>
            <Poster item={item} type={item.media_type} />
          </div>
        ))}
      </div>
      <button onClick={getNextPage}>
        {loading ? 'Loading' : 'More Results'}
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // If no favourites are available, then 404 this page
  if (!moviedb.hasFavouritesAvailable()) {
    return { notFound: true };
  }
  const results = await moviedb.getFavourites();
  return { props: { results } };
};

export default PopularMovies;

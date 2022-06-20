import type { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import tmdb, { PagedResults, ListItem } from '@/services/tmdb';
import Poster from '@/components/Poster';

interface Props {
  results: PagedResults<ListItem>;
}

const FavouritesListPage: NextPage<Props> = ({ results }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(results.page);
  const [totalPages, setTotalPages] = useState<number>(results.total_pages);
  const [items, setItems] = useState<ListItem[]>(results.results);
  const [error, setError] = useState<boolean>(false);

  const getNextPage = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PagedResults<ListItem>>(
        '/api/favourites',
        { params: { page: page + 1 } }
      );
      const data = response.data;
      setItems([...items, ...data.results]);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (e: any) {
      console.error('Failed to fetch favourites page: ', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: page < totalPages,
    onLoadMore: getNextPage,
    // When there is an error, we stop infinite loading.
    disabled: error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white capitalize">My Favourites</h1>
      <div className="flex flex-wrap justify-center sm:mx-2">
        {items.map((item) => (
          <div key={item.id} className="m-2">
            <Poster item={item} type={item.media_type} />
          </div>
        ))}
        <div ref={sentryRef} />
      </div>
      <div className="flex flex-col items-center mt-1 mb-5 text-white">
        {loading && page !== totalPages && <div>Loading...</div>}
        {page === totalPages && <div>No more results</div>}
      </div>
    </div>
  );
};

export default FavouritesListPage;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!tmdb.hasFavouritesAvailable()) {
    return { notFound: true };
  }
  const results = await tmdb.getFavourites();
  return { props: { results } };
};

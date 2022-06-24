import type { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import axios from 'axios';
import tmdb, { PagedResults, ListItem } from '@/services/tmdb';
import MediaPoster from '@/components/MediaPoster';
import MetaHead from '@/components/MetaHead';
import InfiniteScroller from '@/components/InfiniteScroller';

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

  return (
    <>
      <MetaHead title="My Favourites" />
      <InfiniteScroller
        loading={loading}
        hasMore={page < totalPages}
        disabled={error}
        onLoadMore={getNextPage}
        className="sm:mx-2"
      >
        {items.map((item) => (
          <MediaPoster key={item.id} item={item} type={item.media_type} />
        ))}
      </InfiniteScroller>
    </>
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

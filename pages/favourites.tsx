import type { NextPage, GetServerSideProps } from 'next';
import tmdb, { PagedResults, ListItem } from '@/services/tmdb';
import { MediaPoster } from '@/components/Posters';
import MetaHead from '@/components/MetaHead';
import { VerticalInfiniteScroller } from '@/components/InfiniteScroller';
import { usePagedResults } from '@/common/hooks';

interface Props {
  results: PagedResults<ListItem>;
}

const FavouritesListPage: NextPage<Props> = ({ results }: Props) => {
  const { loading, page, totalPages, items, getNextPage, error } =
    usePagedResults<ListItem>('/api/favourites', results);

  return (
    <>
      <MetaHead title="My Favourites" />
      <VerticalInfiniteScroller
        loading={loading}
        hasMore={page < totalPages}
        disabled={error}
        onLoadMore={getNextPage}
        className="sm:mx-5"
      >
        {items.map((item) => (
          <MediaPoster key={item.id} item={item} type={item.media_type} />
        ))}
      </VerticalInfiniteScroller>
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

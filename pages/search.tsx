import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import tmdb, { PagedResults, ListItem, MediaTypeEnum } from '@/services/tmdb';
import { MediaPoster } from '@/components/Posters';
import MetaHead from '@/components/MetaHead';
import { VerticalInfiniteScroller } from '@/components/InfiniteScroller';
import SearchBar from '@/components/SearchBar';
import { usePagedResults } from '@/common/hooks';

interface Props {
  results?: PagedResults<ListItem>;
}

const SearchPage: NextPage<Props> = ({ results }: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>(router.query.q as string);
  const { loading, page, totalPages, items, getNextPage, error } =
    usePagedResults<ListItem>('/api/search', results, query);

  useEffect(() => {
    const { q, ...others } = router.query;
    if (query?.length && query.length > 0) {
      router.replace({
        query: { ...others, q: query },
      });
    } else {
      router.replace({
        query: { ...others },
      });
    }
  }, [query]);

  return (
    <>
      <MetaHead title="Search" />
      <SearchBar onSearch={(v) => setQuery(v)} value={query} />
      <VerticalInfiniteScroller
        loading={loading}
        hasMore={page < totalPages}
        disabled={error}
        onLoadMore={getNextPage}
        className="sm:mx-5 mt-2"
      >
        {items
          .filter((item) =>
            Object.values(MediaTypeEnum).includes(item.media_type)
          )
          .map((item) => (
            <MediaPoster key={item.id} item={item} type={item.media_type} />
          ))}
      </VerticalInfiniteScroller>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const q = query.q as string;
  if (!q || !q.length) {
    return { props: {} };
  }
  const results = await tmdb.search(q);
  return { props: { results } };
};

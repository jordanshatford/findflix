import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import tmdb, { PagedResults, ListItem, MediaTypeEnum } from '@/services/tmdb';
import MediaPoster from '@/components/MediaPoster';
import MetaHead from '@/components/MetaHead';
import { VerticalInfiniteScroller } from '@/components/InfiniteScroller';
import SearchBar from '@/components/SearchBar';

interface Props {
  results?: PagedResults<ListItem>;
}

const SearchPage: NextPage<Props> = ({ results }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(results?.page ?? 0);
  const [totalPages, setTotalPages] = useState<number>(
    results?.total_pages ?? 0
  );
  const [items, setItems] = useState<ListItem[]>(results?.results ?? []);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(router.query.q as string);

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

  const getNextPage = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PagedResults<ListItem>>('/api/search', {
        params: { q: query, page: page + 1 },
      });
      const data = response.data;
      setItems([...items, ...data.results]);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (e: any) {
      console.error('Failed to fetch search result: ', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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

import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import tmdb, {
  type PagedResults,
  type Movie,
  type TVShow,
  MovieListEnum,
  MediaTypeEnum,
  TVShowListEnum,
} from '@/services/tmdb';
import MediaPoster from '@/components/MediaPoster';
import MediaCategoryTabs from '@/components/MediaCategoryTabs';
import MetaHead from '@/components/MetaHead';
import InfiniteScroller from '@/components/InfiniteScroller';
import { toReadableString } from '@/utilities/index';

interface Props {
  results: PagedResults<Partial<Movie & TVShow>>;
}

const MediaListPage: NextPage<Props> = ({ results }: Props) => {
  const router = useRouter();
  const type = router.query.type as MediaTypeEnum;
  const list = router.query.id as string;

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(results.page);
  const [totalPages, setTotalPages] = useState(results.total_pages);
  const [items, setItems] = useState<Partial<Movie & TVShow>[]>(
    results.results
  );
  const [error, setError] = useState(false);

  const getNextPage = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PagedResults<Partial<Movie & TVShow>>>(
        `/api/${type}/${list}`,
        { params: { page: page + 1 } }
      );
      const data = response.data;
      setItems([...items, ...data.results]);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (e: any) {
      console.error(`Failed to fetch ${type} ${list} page: `, e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaHead
        title={`${toReadableString(list)} - ${toReadableString(type)}`}
      />
      <MediaCategoryTabs />
      <InfiniteScroller
        loading={loading}
        hasMore={page < totalPages}
        disabled={error}
        onLoadMore={getNextPage}
        className="sm:mx-2 mt-2"
      >
        {items.map((item) => (
          <MediaPoster key={item.id} item={item} type={type} />
        ))}
      </InfiniteScroller>
    </>
  );
};

export default MediaListPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const type = params?.type as MediaTypeEnum;
  switch (type) {
    case MediaTypeEnum.MOVIE: {
      // The id in this case is actually the name of the list
      const list = params?.id as MovieListEnum;
      if (!tmdb.isValidList(type, list)) {
        return { notFound: true };
      }
      const results = await tmdb.getMovieListPagedResults(list);
      return { props: { results } };
    }
    case MediaTypeEnum.TV_SHOW: {
      // The id in this case is actually the name of the list
      const list = params?.id as TVShowListEnum;
      if (!tmdb.isValidList(type, list)) {
        return { notFound: true };
      }
      const results = await tmdb.getTVShowListPagedResults(list);
      return { props: { results } };
    }
    default: {
      return { notFound: true };
    }
  }
};

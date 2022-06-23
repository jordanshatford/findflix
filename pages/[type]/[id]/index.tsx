import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
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
import PagedResultIndicator from '@/components/PagedResultIndicator';

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

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: page < totalPages,
    onLoadMore: getNextPage,
    // When there is an error, we stop infinite loading.
    disabled: error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 200px 0px',
  });

  return (
    <div className="flex flex-col items-center sm:mx-2">
      <MediaCategoryTabs />
      <div className="mt-2 flex flex-wrap justify-center">
        {items.map((item) => (
          <div key={item.id} className="m-2">
            <MediaPoster item={item} type={type} />
          </div>
        ))}
      </div>
      <div ref={sentryRef} />
      <PagedResultIndicator isLoading={loading} hasMore={page < totalPages} />
    </div>
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

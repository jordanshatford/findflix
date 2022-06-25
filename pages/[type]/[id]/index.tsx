import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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
import { VerticalInfiniteScroller } from '@/components/InfiniteScroller';
import { toReadableString } from '@/common/utils';
import { usePagedResults } from '@/common/hooks';

interface Props {
  results: PagedResults<Partial<Movie & TVShow>>;
}

const MediaListPage: NextPage<Props> = ({ results }: Props) => {
  const router = useRouter();
  const type = router.query.type as MediaTypeEnum;
  const list = router.query.id as string;

  const { loading, page, totalPages, items, getNextPage, error } =
    usePagedResults<Partial<Movie & TVShow>>(`/api/${type}/${list}`, results);

  return (
    <>
      <MetaHead
        title={`${toReadableString(list)} - ${toReadableString(type)}`}
      />
      <MediaCategoryTabs />
      <VerticalInfiniteScroller
        loading={loading}
        hasMore={page < totalPages}
        disabled={error}
        onLoadMore={getNextPage}
        className="sm:mx-5 mt-2"
      >
        {items.map((item) => (
          <MediaPoster key={item.id} item={item} type={type} />
        ))}
      </VerticalInfiniteScroller>
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

import { MediaTypeEnum, Movie, PagedResults, TVShow } from '@/services/tmdb';
import { HorizontalInfiniteScroller } from '@/components/InfiniteScroller';
import { MediaPoster } from '@/components/Posters';
import { Container } from '@/components/Containers';
import { usePagedResults } from '@/common/hooks';

interface Props {
  results?: PagedResults<Partial<Movie & TVShow>>;
  type: MediaTypeEnum;
  title: string;
  url: string;
}

// Some items (Like similar movies) can have ALOT of pages. This caps that.
const MAX_PAGES = 5;

const RelatedMediaContainer = ({ results, type, title, url }: Props) => {
  const { page, totalPages, items, getNextPage } = usePagedResults<
    Partial<Movie & TVShow>
  >(url, results);

  return (
    <>
      {items.length ? (
        <Container title={title}>
          <HorizontalInfiniteScroller
            hasMore={page < totalPages && page < MAX_PAGES}
            onLoadMore={getNextPage}
          >
            {items.map((item) => (
              <HorizontalInfiniteScroller.Item
                key={item.id}
                itemId={`${item.id}`}
              >
                <MediaPoster item={item} type={type} />
              </HorizontalInfiniteScroller.Item>
            ))}
          </HorizontalInfiniteScroller>
        </Container>
      ) : null}
    </>
  );
};

export default RelatedMediaContainer;

import { MediaTypeEnum, Movie, PagedResults, TVShow } from '@/services/tmdb';
import { HorizontalInfiniteScroller } from '@/components/InfiniteScroller';
import { MediaPoster } from '@/components/Posters';
import { Container } from '@/components/Containers';

interface Props {
  results?: PagedResults<Partial<Movie & TVShow>>;
  type: MediaTypeEnum;
  title: string;
}

// TODO: allow loading more

const RelatedMediaContainer = ({ results, type, title }: Props) => {
  return (
    <>
      {results?.results?.length ? (
        <Container title={title}>
          <HorizontalInfiniteScroller hasMore={false} onLoadMore={() => {}}>
            {results.results.map((item) => (
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

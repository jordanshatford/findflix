import { DetailedTVShow } from '@/services/tmdb';
import { HorizontalInfiniteScroller } from '@/components/InfiniteScroller';
import { SeasonPoster } from '@/components/Posters';
import { Container } from '@/components/Containers';

interface Props {
  show: DetailedTVShow;
}

// Note: A detailed show will always contain all seasons, so we never need
//       to load more.

const SeasonsContainer = ({ show }: Props) => {
  return (
    <>
      {show?.seasons?.length ? (
        <Container title={`Seasons (${show.seasons.length}):`}>
          <HorizontalInfiniteScroller hasMore={false} onLoadMore={() => {}}>
            {show.seasons
              .filter((s) => s.season_number > 0)
              .map((season) => (
                <HorizontalInfiniteScroller.Item
                  key={season.id}
                  itemId={`${season.id}`}
                >
                  <SeasonPoster season={season} show={show} />
                </HorizontalInfiniteScroller.Item>
              ))}
          </HorizontalInfiniteScroller>
        </Container>
      ) : null}
    </>
  );
};

export default SeasonsContainer;

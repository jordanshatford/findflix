import { Season, TVShow } from '@/services/tmdb';
import { HorizontalInfiniteScroller } from '@/components/InfiniteScroller';
import { EpisodePoster } from '@/components/Posters';
import { Container } from '@/components/Containers';

interface Props {
  show: TVShow;
  season: Season;
}

// Note: There will never be a need to fetch more episodes

const EpisodesContainer = ({ show, season }: Props) => {
  return (
    <>
      {season?.episodes?.length ? (
        <Container title={`Episodes (${season.episodes.length}):`}>
          <HorizontalInfiniteScroller hasMore={false} onLoadMore={() => {}}>
            {season.episodes.map((episode) => (
              <HorizontalInfiniteScroller.Item
                key={episode.id}
                itemId={`${episode.id}`}
              >
                <EpisodePoster show={show} season={season} episode={episode} />
              </HorizontalInfiniteScroller.Item>
            ))}
          </HorizontalInfiniteScroller>
        </Container>
      ) : null}
    </>
  );
};

export default EpisodesContainer;

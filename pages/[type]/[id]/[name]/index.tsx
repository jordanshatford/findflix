import type { GetServerSideProps, NextPage } from 'next';
import tmdb, {
  MediaTypeEnum,
  DetailedMovie,
  DetailedTVShow,
} from '@/services/tmdb';
import { MediaPoster } from '@/components/Posters';
import BackdropImage from '@/components/BackdropImage';
import MediaStats from '@/components/MediaStats';
import MediaTags from '@/components/MediaTags';
import MetaHead from '@/components/MetaHead';
import {
  SeasonsContainer,
  RelatedMediaContainer,
  MediaPageContainer,
} from '@/components/Containers';
import { Text, Title } from '@/components/Typography';

interface Props {
  item: Partial<DetailedMovie & DetailedTVShow>;
  type: MediaTypeEnum;
}

const MediaDetailPage: NextPage<Props> = ({ item, type }: Props) => {
  return (
    <>
      <MetaHead title={type === MediaTypeEnum.MOVIE ? item.title : item.name} />
      <BackdropImage src={tmdb.getImageLink(item.backdrop_path, 'original')} />
      <MediaPageContainer
        poster={<MediaPoster item={item} type={type} isHoverable={false} />}
        additional={
          <>
            {type === MediaTypeEnum.TV_SHOW && (
              <SeasonsContainer show={item as DetailedTVShow} />
            )}
            <RelatedMediaContainer
              title="Similiar:"
              url={`/api/${type}/${item.id}/similar`}
              results={item.similar}
              type={type}
            />
            <RelatedMediaContainer
              title="Recommendations:"
              url={`/api/${type}/${item.id}/recommendations`}
              results={item.recommendations}
              type={type}
            />
          </>
        }
      >
        <Title>{type === MediaTypeEnum.MOVIE ? item.title : item.name}</Title>
        <Text>{item.tagline}</Text>
        <MediaStats
          airDate={tmdb.toDate(item.release_date ?? item.first_air_date)}
          voteAverage={item.vote_average}
          duration={item.runtime}
          seasons={item.seasons?.length}
        />
        <MediaTags values={item?.genres} />
        <Text>{item.overview}</Text>
      </MediaPageContainer>
    </>
  );
};

export default MediaDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id, type } = params as { id: string; type: MediaTypeEnum };
  switch (type) {
    case MediaTypeEnum.MOVIE:
    case MediaTypeEnum.TV_SHOW: {
      try {
        const item =
          type === MediaTypeEnum.MOVIE
            ? await tmdb.getMovieDetails(id)
            : await tmdb.getTVShowDetails(id);
        return { props: { item, type } };
      } catch (e) {
        return { notFound: true };
      }
    }
    default: {
      return { notFound: true };
    }
  }
};

import tmdb, { MediaTypeEnum, Movie, TVShow } from '@/services/tmdb';
import { toURLSafe } from '@/common/utils';
import { Poster } from '@/components/Posters';

interface Props {
  item: Partial<Movie & TVShow>;
  type: MediaTypeEnum;
  isHoverable?: boolean;
}

const MediaPoster = ({ item, type, isHoverable = true }: Props) => {
  return (
    <Poster
      imageUrl={tmdb.getImageLink(item.poster_path)}
      href={{
        pathname: '/[type]/[id]/[name]',
        query: {
          type,
          id: item.id,
          name: toURLSafe(
            type === MediaTypeEnum.MOVIE ? item.title : item.name
          ),
        },
      }}
      title={type === MediaTypeEnum.MOVIE ? item.title : item.name}
      subtitle={tmdb
        .toDate(item.release_date ?? item.first_air_date)
        ?.getFullYear()
        ?.toString()}
      description={item.overview}
      isHoverable={isHoverable}
    />
  );
};

export default MediaPoster;

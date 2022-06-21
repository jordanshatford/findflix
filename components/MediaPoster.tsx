import tmdb, { MediaTypeEnum, Movie, TVShow } from '@/services/tmdb';
import { toURLSafe } from '@/utilities/index';
import Poster from '@/components/Poster';

interface Props {
  item: Partial<Movie & TVShow>;
  type: MediaTypeEnum;
  isHoverable?: boolean;
}

const MediaPoster = ({ item, type, isHoverable = true }: Props) => {
  const creationDate = tmdb.getMediaCreationDate(item, type);
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
      subtitle={creationDate ? creationDate.getFullYear().toString() : '???'}
      description={item.overview}
      isHoverable={isHoverable}
    />
  );
};

export default MediaPoster;

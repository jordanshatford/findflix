import tmdb, { MediaTypeEnum, Season, TVShow } from '@/services/tmdb';
import { toURLSafe, toReadableDate } from '@/utilities/index';
import Poster from '@/components/Poster';

interface Props {
  show: TVShow;
  season: Season;
  isHoverable?: boolean;
}

const SeasonPoster = ({ show, season, isHoverable = true }: Props) => {
  return (
    <Poster
      imageUrl={tmdb.getImageLink(season.poster_path)}
      href={{
        pathname: '/[type]/[id]/[name]/season/[seasonId]',
        query: {
          type: MediaTypeEnum.TV_SHOW,
          id: show.id,
          name: toURLSafe(show.name),
          seasonId: season.season_number,
        },
      }}
      title={show.name}
      subtitle={`Season ${season.season_number}`}
      description={toReadableDate(tmdb.toDate(season.air_date))}
      isHoverable={isHoverable}
    />
  );
};

export default SeasonPoster;

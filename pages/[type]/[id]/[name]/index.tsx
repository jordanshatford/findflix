import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Play } from 'phosphor-react';
import tmdb, {
  MediaTypeEnum,
  DetailedMovie,
  DetailedTVShow,
} from '@/services/tmdb';
import Tag from '@/components/Tag';
import MediaPoster from '@/components/MediaPoster';
import MediaStats from '@/components/MediaStats';
import { toURLSafe } from '@/utilities/index';

interface Props {
  item: Partial<DetailedMovie & DetailedTVShow>;
  type: MediaTypeEnum;
  hasWatchLink?: boolean;
}

const MediaDetailPage: NextPage<Props> = ({
  item,
  type,
  hasWatchLink,
}: Props) => {
  return (
    <div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${tmdb.getImageLink(
            item.backdrop_path,
            'original'
          )})`,
        }}
      ></div>
      <div className="w-full relative">
        <div
          className="w-full min-h-screen flex items-end backdrop-blur-sm px-5 md:px-20 pb-14"
          style={{
            background: `linear-gradient(360deg, #18181B 30%, transparent)`,
          }}
        >
          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start">
            <MediaPoster item={item} type={type} isHoverable={false} />
            <div className="pt-2 sm:pl-5 flex flex-col gap-y-2 justify-end w-full">
              <h2 className="font-semibold text-white text-3xl">
                {type === MediaTypeEnum.MOVIE ? item.title : item.name}
              </h2>
              <p className="text-sm text-zinc-300">{item.tagline}</p>
              <MediaStats
                airDate={tmdb.getMediaCreationDate(item, type)}
                voteAverage={item.vote_average}
                duration={item.runtime}
                seasons={item.seasons?.length}
              />
              <div className="flex flex-wrap">
                {item?.genres?.map((genre) => (
                  <Tag key={genre.id} text={genre.name} />
                ))}
              </div>
              <p className="text-sm text-justify text-zinc-300">
                {item.overview}
              </p>
              {hasWatchLink && type === MediaTypeEnum.MOVIE && (
                <Link
                  href={{
                    pathname: `/[type]/[id]/[name]/watch`,
                    query: {
                      type,
                      id: item.id,
                      name: toURLSafe(
                        type === MediaTypeEnum.MOVIE ? item.title : item.name
                      ),
                    },
                  }}
                  passHref
                >
                  <a className="flex items-center text-white text-sm py-2 px-3 rounded-lg w-max bg-zinc-600">
                    <Play size={15} weight="fill" className="mr-1" />
                    Watch Now
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
        const creationDate = tmdb.getMediaCreationDate(item, type);
        const hasWatchLink =
          creationDate &&
          new Date() > creationDate &&
          tmdb.hasWatchLinkAvailable();
        return { props: { item, hasWatchLink, type } };
      } catch (e) {
        return { notFound: true };
      }
    }
    default: {
      return { notFound: true };
    }
  }
};

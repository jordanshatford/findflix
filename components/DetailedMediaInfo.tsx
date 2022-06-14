import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Star, Play } from 'phosphor-react';
import Tag from '@/components/Tag';
import { toHourMinutes, toReadableDate, toURLSafe } from '@/utilities/index';
import moviedb, {
  MediaTypeEnum,
  DetailedMovie,
  DetailedTVShow,
} from '@/services/moviedb';

interface Props {
  item: Partial<DetailedMovie & DetailedTVShow>;
  type: MediaTypeEnum;
  availableToWatch?: boolean;
}

const DetailedMediaInfo = ({ item, type, availableToWatch = false }: Props) => {
  const posterImageUrl = moviedb.getImageLink(item.poster_path);
  const creationDate = moviedb.getMediaCreationDate(item, type);
  return (
    <div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${moviedb.getImageLink(
            item.backdrop_path,
            'original'
          )})`,
        }}
      ></div>
      <div className="w-full relative">
        <div
          className="w-full min-h-screen flex items-end backdrop-blur-[1px] px-[50px] pb-[50px]"
          style={{
            background: `linear-gradient(360deg, #18181B 30%, transparent)`,
          }}
        >
          <div className="flex">
            <div className="w-[210px] h-[320px] bg-zinc-800 rounded-lg relative self-end">
              <div className="w-[210px] h-[320px] rounded-lg object-cover object-top overflow-hidden relative bg-zinc-800">
                {posterImageUrl && (
                  <Image
                    src={posterImageUrl}
                    layout="fill"
                    placeholder="blur"
                    objectFit="cover"
                    blurDataURL={posterImageUrl}
                    alt={type === MediaTypeEnum.MOVIE ? item.title : item.name}
                  />
                )}
              </div>
            </div>
            <div className="pt-[10px] pl-[30px] flex flex-col justify-end max-w-[1000px] min-w-[450px]">
              <h2 className="font-semibold text-white text-3xl mb-[4px]">
                {type === MediaTypeEnum.MOVIE ? item.title : item.name}
              </h2>
              <p className="text-sm text-zinc-300">{item.tagline}</p>
              <div className="mt-2">
                <div className="flex items-center text-xs text-zinc-300">
                  {creationDate && (
                    <>
                      <Calendar size={20} weight="fill" />
                      <span className="ml-1">
                        {toReadableDate(creationDate)}
                      </span>
                    </>
                  )}
                  <Star className="ml-2" size={20} weight="fill" />
                  <span className="ml-1">{item.vote_average}</span>
                  {item.runtime && (
                    <>
                      <Clock className="ml-2" size={20} weight="fill" />
                      <span className="ml-1">
                        {toHourMinutes(item.runtime)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap">
                {item?.genres?.map((genre) => (
                  <Tag key={genre.id} text={genre.name} />
                ))}
              </div>
              <p className="mt-3 text-sm text-justify text-zinc-300">
                {item.overview}
              </p>
              {availableToWatch && (
                <Link
                  href={{
                    pathname: `/[type]/[id]/[title]/watch`,
                    query: {
                      type,
                      id: item.id,
                      title: toURLSafe(
                        type === MediaTypeEnum.MOVIE ? item.title : item.name
                      ),
                    },
                  }}
                >
                  <div className="flex items-center text-white text-sm py-2 px-3 rounded-lg mt-3 w-max bg-zinc-600">
                    <Play size={15} weight="fill" className="mr-1" />
                    Watch Now
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedMediaInfo;

import {
  IconContext,
  Calendar,
  Clock,
  Star,
  MonitorPlay,
} from 'phosphor-react';
import { toHourMinutes, toReadableDate } from '@/common/utils';

interface Props {
  airDate?: Date;
  voteAverage?: number;
  duration?: number;
  seasons?: number;
  episodes?: number;
  className?: string;
}

const MediaStats = (props: Props) => {
  return (
    <div
      className={`flex gap-1 items-center text-xs text-zinc-300 ${props.className}`}
    >
      <IconContext.Provider
        value={{
          size: 20,
          weight: 'fill',
        }}
      >
        {props.airDate && (
          <>
            <Calendar />
            <span>{toReadableDate(props.airDate)}</span>
          </>
        )}
        {props.voteAverage && (
          <>
            <Star className="ml-1" />
            <span>{props.voteAverage}</span>
          </>
        )}
        {props.duration && (
          <>
            <Clock className="ml-1" />
            <span>{toHourMinutes(props.duration)}</span>
          </>
        )}
        {props.seasons && (
          <>
            <MonitorPlay className="ml-1" />
            <span>{props.seasons} season(s)</span>
          </>
        )}
        {props.episodes && (
          <>
            <MonitorPlay className="ml-1" />
            <span>{props.episodes} episode(s)</span>
          </>
        )}
      </IconContext.Provider>
    </div>
  );
};

export default MediaStats;

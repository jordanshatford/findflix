import {
  CalendarIcon,
  ClockIcon,
  StarIcon,
  DesktopComputerIcon,
} from '@heroicons/react/solid';
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
      {props.airDate && (
        <>
          <CalendarIcon className="w-5 h-5" />
          <span>{toReadableDate(props.airDate)}</span>
        </>
      )}
      {props.voteAverage && (
        <>
          <StarIcon className="ml-1 w-5 h-5" />
          <span>{props.voteAverage}</span>
        </>
      )}
      {props.duration && (
        <>
          <ClockIcon className="ml-1 w-5 h-5" />
          <span>{toHourMinutes(props.duration)}</span>
        </>
      )}
      {props.seasons && (
        <>
          <DesktopComputerIcon className="ml-1 w-5 h-5" />
          <span>{props.seasons} season(s)</span>
        </>
      )}
      {props.episodes && (
        <>
          <DesktopComputerIcon className="ml-1 w-5 h-5" />
          <span>{props.episodes} episode(s)</span>
        </>
      )}
    </div>
  );
};

export default MediaStats;

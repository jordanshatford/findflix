import type { NextApiRequest, NextApiResponse } from 'next';
import tmdb, {
  type PagedResults,
  type Movie,
  TVShow,
  MovieListEnum,
  MediaTypeEnum,
  TVShowListEnum,
} from '@/services/tmdb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<PagedResults<Partial<Movie & TVShow>>>>
) {
  const type = req.query.type as MediaTypeEnum;
  const page: number = parseInt(req.query.page as string) || 1;
  switch (type) {
    case MediaTypeEnum.MOVIE: {
      const list = req.query.list as MovieListEnum;
      if (!tmdb.isValidList(type, list)) {
        res.status(404).json({});
        return;
      }
      const results = await tmdb.getMovieListPagedResults(list, page);
      res.status(200).json(results);
      break;
    }
    case MediaTypeEnum.TV_SHOW: {
      const list = req.query.list as TVShowListEnum;
      if (!tmdb.isValidList(type, list)) {
        res.status(404).json({});
        return;
      }
      const results = await tmdb.getTVShowListPagedResults(list, page);
      res.status(200).json(results);
      break;
    }
    default: {
      res.status(404).json({});
      break;
    }
  }
}

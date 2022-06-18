import type { NextApiRequest, NextApiResponse } from 'next';
import tmdb, {
  type PagedResults,
  type Movie,
  TVShow,
  MovieListEnum,
  MediaTypeEnum,
  TVShowListEnum,
} from '@/services/tmdb';

type ResponseData = {
  error: boolean;
  data?: PagedResults<Partial<Movie & TVShow>>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const type = req.query.type as MediaTypeEnum;
  const page: number = parseInt(req.query.page as string) || 1;

  if (type === MediaTypeEnum.MOVIE) {
    const list = req.query.list as MovieListEnum;
    if (!tmdb.isValidList(type, list)) {
      res.status(404).json({ error: true });
      return;
    }
    const results = await tmdb.getMovieListPagedResults(list, page);
    res.status(200).json({ error: false, data: results });
    return;
  } else if (type === MediaTypeEnum.TV_SHOW) {
    const list = req.query.list as TVShowListEnum;
    if (!tmdb.isValidList(type, list)) {
      res.status(404).json({ error: true });
      return;
    }
    const results = await tmdb.getTVShowListPagedResults(list, page);
    res.status(200).json({ error: false, data: results });
    return;
  }
  return { notFound: true };
}
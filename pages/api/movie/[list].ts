import type { NextApiRequest, NextApiResponse } from 'next';
import moviedb, {
  type PagedResults,
  type Movie,
  MovieListEnum,
} from '@/services/moviedb';

type ResponseData = {
  error: boolean;
  data?: PagedResults<Movie>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const list = req.query.list as MovieListEnum;
  if (!Object.values(MovieListEnum).includes(list)) {
    res.status(404).json({ error: true });
  } else {
    const page: number = parseInt(req.query.page as string) || 1;
    const results = await moviedb.getMovieListPagedResults(list, page);
    res.status(200).json({ error: false, data: results });
  }
}

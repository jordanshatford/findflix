import type { NextApiRequest, NextApiResponse } from 'next';
import tmdb, {
  type PagedResults,
  type Movie,
  TVShow,
  MediaTypeEnum,
} from '@/services/tmdb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<PagedResults<Partial<Movie & TVShow>>>>
) {
  const type = req.query.type as MediaTypeEnum;
  const id = req.query.id as string;
  const page: number = parseInt(req.query.page as string) || 1;

  if (!id) {
    res.status(404).json({});
    return;
  }

  switch (type) {
    case MediaTypeEnum.MOVIE: {
      const results = await tmdb.getMovieSimilar(id, page);
      res.status(200).json(results);
      break;
    }
    case MediaTypeEnum.TV_SHOW: {
      const results = await tmdb.getTVSimilar(id, page);
      res.status(200).json(results);
      break;
    }
    default: {
      res.status(404).json({});
      break;
    }
  }
}

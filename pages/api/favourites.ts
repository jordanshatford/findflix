import type { NextApiRequest, NextApiResponse } from 'next';
import tmdb, { type PagedResults, type ListItem } from '@/services/tmdb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<PagedResults<ListItem>>>
) {
  if (!tmdb.hasFavouritesAvailable()) {
    res.status(404).send({});
  } else {
    const page: number = parseInt(req.query.page as string) || 1;
    const results = await tmdb.getFavourites(page);
    res.status(200).json(results);
  }
}

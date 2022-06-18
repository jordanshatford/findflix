import type { NextApiRequest, NextApiResponse } from 'next';
import tmdb, { type PagedResults, type ListItem } from '@/services/tmdb';

type ResponseData = {
  error: boolean;
  data?: PagedResults<ListItem>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!tmdb.hasFavouritesAvailable()) {
    res.status(404).json({ error: true });
  } else {
    const page: number = parseInt(req.query.page as string) || 1;
    const results = await tmdb.getFavourites(page);
    res.status(200).json({ error: false, data: results });
  }
}

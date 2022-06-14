import type { NextApiRequest, NextApiResponse } from 'next';
import moviedb, { type PagedResults, type ListItem } from '@/services/moviedb';

type ResponseData = {
  error: boolean;
  data?: PagedResults<ListItem>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!moviedb.hasFavouritesAvailable()) {
    res.status(404).json({ error: true });
  } else {
    const page: number = parseInt(req.query.page as string) || 1;
    const results = await moviedb.getFavourites(page);
    res.status(200).json({ error: false, data: results });
  }
}

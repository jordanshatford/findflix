import type { NextApiRequest, NextApiResponse } from 'next';
import tmdb, { type PagedResults, type ListItem } from '@/services/tmdb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<PagedResults<ListItem>>>
) {
  const page: number = parseInt(req.query.page as string) || 1;
  const term: string = req.query.q as string;
  if (!term.length) {
    res.status(404).send({});
  } else {
    const results = await tmdb.search(term, page);
    res.status(200).json(results);
  }
}

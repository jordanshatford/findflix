import { useEffect, useState } from 'react';
import axios from 'axios';
import { type PagedResults } from '@/services/tmdb';

export default function usePagedResults<T>(
  url: string,
  initialValue?: PagedResults<T>,
  query?: string
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (initialValue) {
      setPage(initialValue.page);
      setTotalPages(initialValue.total_pages);
      setItems(initialValue.results);
    }
  }, []);

  const getNextPage = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PagedResults<T>>(url, {
        params: { page: page + 1, q: query },
      });
      const data = response.data;
      setPage(data.page);
      setTotalPages(data.total_pages);
      setItems([...items, ...data.results]);
    } catch (e: any) {
      console.error(`Failed to fetch ${url}: `, e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    page,
    totalPages,
    getNextPage,
    items,
    error,
  };
}

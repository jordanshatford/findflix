import type { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from "react"
import axios from "axios"
import moviedb, { type MovieDBPagedResults, type MovieResult, MovieListEnum } from "../../services/movie-db"
import Poster from "../../components/Poster"

interface Props {
    results: MovieDBPagedResults<MovieResult>
}

const PopularMovies: NextPage<Props> = ({ results }: Props) => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [movies, setMovies] = useState<MovieResult[]>([])

    useEffect(() => {
        setMovies(results.results)
        setTotalPages(results.total_pages)
        setTotalResults(results.total_results)
        setPage(results.page)
    }, [])

    const getNextPage = async () => {
        setLoading(true)
        const response = await axios.get<{ error: boolean, data: MovieDBPagedResults<MovieResult> }>(`/api/movies/${MovieListEnum.POPULAR}`, { params: { page: page + 1 } });
        if (!response.data.error) {
            setMovies([...movies, ...response.data.data.results])
            setPage(response.data.data.page)
            setLoading(false)
        }
    }

    return (<>
        <h1>Popular Movies - { page } of { totalPages } with { totalResults } result</h1>
        <div>
        { movies.map(movie => (
            <Poster key={movie.id} item={movie} type="movie"></Poster>
        ))}
        </div>
        <button onClick={getNextPage}>{ loading ? 'Loading': 'More Results' }</button>
    </>)
}

export const getServerSideProps: GetServerSideProps = async () => {
    const results = await moviedb.getMovieList(MovieListEnum.POPULAR)
    return { props: { results } }
}

export default PopularMovies

import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.MOVIEDB_API_KEY as string,
    }
})

export const IMAGE_BASE_URL = "https://image.tmdb.org"

export interface MovieResult {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface TVShowResult {
    backdrop_path: string | null
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    origin_country: string
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string | null
    vote_average: number
    vote_count: number
}

export interface MovieDBPagedResults<T> {
    page: number
    total_results: number
    total_pages: number
    results: T[]
}

export enum MovieListEnum {
    POPULAR = "popular",
    LATEST = "latest",
    NOW_PLAYING = "now_playing",
    TOP_RATED = "top_rated",
    UPCOMING = "upcoming"
}

export async function getMovieList(list: MovieListEnum, page: number = 1): Promise<MovieDBPagedResults<MovieResult>> {
    const data = await axiosInstance.get<MovieDBPagedResults<MovieResult>>(`/movie/${list}`, { params: { page } });
    return data.data
}

export async function getTVShowList(list: "latest" | "airing_today" | "on_the_air" | "popular" | "top_rated", page: number = 1): Promise<MovieDBPagedResults<TVShowResult>> {
    const data = await axiosInstance.get<MovieDBPagedResults<TVShowResult>>(`/tv/${list}`, { params: { page } });
    return data.data
}

export async function getMovie(mId: string) {

}

export async function getTVShow(showId: string) {

}

export async function getTrendingMovies() {

}

export async function getTrendingTVShows() {

}

export default {
    getMovieList,
}
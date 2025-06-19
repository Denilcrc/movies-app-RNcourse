import { movieApi } from "@/core/api/movie-api"
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response"
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper"

interface Options {
    page?: number //unknown porque pageParam lo es y lo necesito
    limit?: number
}


export const topRatedMoviesAction = async ({limit = 10, page = 1}: Options) => {

    try {
        
        const {data} = await movieApi.get<MovieDBMoviesResponse>('/top_rated', {
            params: {
                page: page,
            }
        })
        // console.log(JSON.stringify(data, null, 2)) //lo probamos en el rootlayout

        const movies = data.results.map( MovieMapper.fromTheMovieDBtoMovie )
        // console.log(JSON.stringify(movies, null, 2)) //aca ya lo vemos como lo definimos en nuestra interface y con nuestro mapper

        return movies;
    } catch (error) {
        console.log(error)
        throw 'Cannot load now playing movies'
    }

}



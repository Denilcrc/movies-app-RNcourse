import { movieApi } from "@/core/api/movie-api"
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response"
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper"



export const upcomingAction = async () => {

    try {
        
        const {data} = await movieApi.get<MovieDBMoviesResponse>('/upcoming')
        // console.log(JSON.stringify(data, null, 2)) //lo probamos en el rootlayout

        const movies = data.results.map( MovieMapper.fromTheMovieDBtoMovie )
        // console.log(JSON.stringify(movies, null, 2)) //aca ya lo vemos como lo definimos en nuestra interface y con nuestro mapper

        return movies;
    } catch (error) {
        console.log(error)
        throw 'Cannot load now playing movies'
    }

}



import { movieApi } from "@/core/api/movie-api";
import { MovieDBMovieResponse } from "@/infrastructure/interfaces/moviedb-movie.response"; //ojo con MovieDBMovieResponse
import { CompleteMovie } from "@/infrastructure/interfaces/movies.interface";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";


export const getMovieByIdActions = async (id:number | string): Promise<CompleteMovie> => {


    try {
        
        const { data } = await movieApi.get<MovieDBMovieResponse>(`/movie/${ id }`)
        console.log(data) //lo probamos en el movie/[id]
        console.log('Pelicula - http cargada')

        return MovieMapper.fromMovieDBtoCompleteMovie(data);
    } catch (error) {
        console.log({error: 'error en peticion'}, error)
        throw 'Cannot load now playing movies'
    }

}



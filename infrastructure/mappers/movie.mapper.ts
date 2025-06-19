import { MovieDBMovieResponse } from '../interfaces/moviedb-movie.response';
import { Result } from '../interfaces/moviedb-response'; //resivimos algo de tipo Result
import { CompleteMovie, Movie } from '../interfaces/movies.interface'; //devolvemos algo de tipo Movie

export class MovieMapper {


    static fromTheMovieDBtoMovie = (movie: Result):Movie => {

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, //https://developer.themoviedb.org/docs/image-basics DE ACA TOMAMOS LA IMAGEN
            backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`, //https://developer.themoviedb.org/docs/image-basics DE ACA TOMAMOS LA IMAGEN
            rating: movie.vote_average,
        }

    }

    static fromMovieDBtoCompleteMovie = (movie: MovieDBMovieResponse):CompleteMovie => {

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, //https://developer.themoviedb.org/docs/image-basics DE ACA TOMAMOS LA IMAGEN
            backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`, //https://developer.themoviedb.org/docs/image-basics DE ACA TOMAMOS LA IMAGEN
            rating: movie.vote_average,
            duration: movie.runtime,
            budget: movie.budget,
            originalTitle: movie.original_title,
            productionCompanies: movie.production_companies.map((company) => company.name), //asi porque en la interface es un array con name y id
            genres: movie.genres.map((genre) => genre.name),
        }
    }

}
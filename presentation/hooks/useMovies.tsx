import { nowPlayingActions } from "@/core/actions/movies/now-playing.action"
import { popularMoviesActions } from "@/core/actions/movies/popular.action"
import { topRatedMoviesAction } from "@/core/actions/movies/top-rated"
import { upcomingAction } from "@/core/actions/movies/upcoming.action"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useMovies = () => {

    // Queries
    const nowPlayingQuery = useQuery({ //custom hook within React Query used to fetch data in a React application
        queryKey: ['movies', 'now-playing'], //el queryKey es como identificamos la respuesta de nowPlayingActions
        queryFn: nowPlayingActions, 
        staleTime: 1000 * 60 * 60 * 24, // mantiene la data sin realizar peticion por 24 horas
    })
    const popularQuery = useQuery({
        queryKey: ['movies', 'popular'], 
        queryFn: popularMoviesActions, 
        staleTime: 1000 * 60 * 60 * 24, 
    })

    const topRatedQuery = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['movies', 'top-rated'], 
        queryFn: ({ pageParam }) => { //estos args son del useInfiniteQuery
            console.log({ pageParam })
            return topRatedMoviesAction({ page: pageParam })
        }, 
        staleTime: 1000 * 60 * 60 * 24, 
        // ojo que getNextPageParam no funciona si la func es mandada () => {<accion>}, debemos mandarla directa
        getNextPageParam: (lastPage, pages) => pages.length + 1, //pages: Movie[][] [ [movie, movie, movie],[movie, movie, movie] ] 
    })
    
    const upcomingQuery = useQuery({
        queryKey: ['movies', 'upcoming'], 
        queryFn: upcomingAction, 
        staleTime: 1000 * 60 * 60 * 24,
    })

    return {
        nowPlayingQuery,
        popularQuery,
        topRatedQuery,
        upcomingQuery,
    }

}


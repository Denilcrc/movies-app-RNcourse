import { Movie } from '@/infrastructure/interfaces/movies.interface'
import { useEffect, useRef } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import MoviePoster from './MoviePoster'

interface Props {
  title?: string
  movies: Movie[]
  className?: string
  loadNextPage?: () => void
}

const MovieHorizontalList = ({movies, title, className, loadNextPage}:Props) => {

  const isLoading = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false //ya no esta cargando
    }, 200)
  }, [movies])

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => { // funcion para saber si se esta cercano al final del scroll y cargarla siguiente page del api
    if (isLoading.current) return //si esta cargando, no hacemos nada para asi no cargar el onscroll

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // determina si se esta cerca del final del scroll
    const isEndClose = ( contentOffset.x + layoutMeasurement.width + 600 ) >= contentSize.width; //bool
    if (!isEndClose) return 

    isLoading.current = true //cargando

    console.log('cargar siguientes movies')
    loadNextPage && loadNextPage() // if loadNextPage existe, ejecutalo

    
  }

  return (
    <View className={`${className}`}>
      {title && <Text className="text-2xl mx-2 font-bold mb-3">{title}</Text>}

      <FlatList
        horizontal //true
        data={movies}
        showsHorizontalScrollIndicator={false} 
        keyExtractor={ (item, i) => `${item.id}-${i}` }
        renderItem={ ({item}) => (
            <MoviePoster id={item.id} poster={item.poster} smallPoster/>
        ) }
        // onScroll={ (event) => { //este evento es muy ruidoso, ya que se ejecuta cada vez que se hace scroll (debemos tener cuidado con lo que se hace)
        //   console.log(event)
        // } }
        onScroll={onScroll} 
      />
    </View>
  )
}

export default MovieHorizontalList


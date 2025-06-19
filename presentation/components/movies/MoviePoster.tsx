import { router } from 'expo-router';
import { Image, Pressable } from 'react-native';

interface Props {
    id: number,
    poster: string, // ojo que no usamos Movie movies.interface
    smallPoster?: boolean,
    className?: string,
}

const MoviePoster = ({poster, id, smallPoster = false, className,}: Props) => {
  return (
    <Pressable 
      className={`active:opacity-90 px-2 ${className}`}
      onPress={() => router.push(`/movie/${id}`)} //redireccion, usamos push y no replace porque con el push nos permite regresar en pantallas
    >
        <Image
            source={{uri: poster}}
            className='shadow-lg rounded-2xl w-full h-full'
            style={{
                width: smallPoster ? 85 : 150,
                height: smallPoster ? 130 : 250,
            }}
            resizeMode='cover'
        />
    </Pressable>
  )
}

export default MoviePoster


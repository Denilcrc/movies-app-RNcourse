import MainSlideShow from "@/presentation/components/movies/MainSlideShow";
import MovieHorizontalList from "@/presentation/components/movies/MovieHorizontal";
import { useMovies } from "@/presentation/hooks/useMovies";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const homeScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies();

  if (nowPlayingQuery.isLoading) {
    // ojo al poderio de tanstack

    return (
      <View className="justify-center items-center flex-1">
        {/* loading */}
        <ActivityIndicator color={"blue"} size={40} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="mt-2 pb-10" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">Movies App</Text>

        {/* carousel de imagenes */}
        <MainSlideShow movies={nowPlayingQuery.data ?? []} />

        {/* popular movies */}
        <MovieHorizontalList
          className="mb-5"
          movies={popularQuery.data ?? []}
          title="Populares"
        />

        {/* top rated */}
        <MovieHorizontalList
          className="mb-5"
          movies={topRatedQuery.data?.pages.flat() ?? []}
          title="Top Rated"
          loadNextPage={ topRatedQuery.fetchNextPage }
        />

        {/* upcoming */}
        <MovieHorizontalList
          className="mb-5"
          movies={upcomingQuery.data ?? []}
          title="Upcoming"
        />
      </View>
    </ScrollView>
  );
};

export default homeScreen;

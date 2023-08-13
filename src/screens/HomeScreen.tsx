// Library imports
import { useEffect, useState, useCallback, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Pressable, SafeAreaView } from "react-native";
import { Image } from "expo-image";

// Component imports
import axiosInstance from "../api/MovieAPI";
import { baseURL } from "../api/Https";
import { IMovieItem, NavigationProps } from "../common/types";

//Flashlist item
// Added memo to avoid re-rendering of the component when the state changes.
// It only re-renders when item changes.
const MovieItem = memo(({ item }: { item: IMovieItem }) => {
  const navigation: any = useNavigation<NavigationProps>();
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("Movie", {
            movie: item,
          })
        }
      >
        <Image
          source={{
            uri: `${baseURL}${item.poster_path}`,
          }}
          style={{
            width: 250,
            height: 300,
          }}
        />
      </Pressable>
    </View>
  );
});

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState<IMovieItem[]>([]);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    // fetch the movie list from the API.
    // Standard approach should be to create a component for the API calls if you have multiple API calls in your app.
    axiosInstance
      .get("?include_adult=false&page=1&language=en-US")
      .then((response) => {
        if (response.status === 200) {
          setMovies(response.data.results);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch more movies when the user reaches the end of the list.
  // useCallback is used to avoid  unnecessary re-rendering of the.
  // It only re-renders when page changes.
  const fetchMoreMovies = useCallback(() => {
    axiosInstance
      .get(`?include_adult=false&page=${page + 1}&language=en-US`)
      .then((response) => {
        if (response.status === 200) {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setPage((prevPage) => prevPage + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    // SafeAreaView is used to avoid the notch / rounded areas in  devices.
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={movies}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <MovieItem item={item} />}
        extraData={movies}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMoreMovies}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
}

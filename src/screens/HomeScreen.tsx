// Library imports
import { useEffect, useState } from "react";
import { FlatList, View, Pressable, SafeAreaView } from "react-native";
import { Image } from "expo-image";

// Component imports
import axiosInstance from "../api/MovieAPI";
import { baseURL } from "../api/Https";

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  //Flashlist item
  const renderItem = ({ item }) => {
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
  };

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

  const fetchMoreMovies = () => {
    // This function will be called and fetch more movies when the user scrolls to the end of the list.
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
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    // SafeAreaView is used to avoid the notch / rounded areas in  devices.
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={movies}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        extraData={movies}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMoreMovies}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
}

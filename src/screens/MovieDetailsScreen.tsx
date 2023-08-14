// Library imports
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { PlayCircleIcon } from "react-native-heroicons/outline";

export default function MovieDetailsScreen({ route }) {
  const movieDetails = route?.params?.movie;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "#59515E", padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            {movieDetails?.title}
          </Text>
        </View>
        <View style={{ margin: 24, flexDirection: "row" }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w154${movieDetails.poster_path}`,
            }}
            style={{
              width: 150,
              height: 200,
            }}
          />
          <View
            style={{
              flexDirection: "column",
              margin: 15,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 24, color: "#000" }}>
              {new Date(movieDetails?.release_date).getFullYear()}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
              {movieDetails?.vote_average}/10
            </Text>
            <Pressable style={{ backgroundColor: "#59515E" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                  padding: 16,
                }}
              >
                Add to Favorite
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ margin: 24 }}>
          <Text style={styles.textStyle}>{movieDetails?.overview}</Text>
        </View>
        <View style={{ margin: 24 }}>
          <Text style={[styles.textStyle, { fontSize: 22 }]}>Trailers</Text>
          <View style={styles.dividerStyle} />
          <View style={{ marginTop: 10 }}>
            {["Play Trailer 1", "Play Trailer 2"].map((item, index) => (
              <Pressable
                style={styles.playButtons}
                key={index}
                testID="playButton"
              >
                <PlayCircleIcon color="#000" />
                <Text style={styles.buttonTitle}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playButtons: {
    backgroundColor: "#DCDCDC",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    opacity: 0.6,
  },
  dividerStyle: {
    borderBottomColor: "#000",
    opacity: 0.6,
    marginVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textStyle: {
    fontSize: 16,
    color: "#000",
    textAlign: "justify",
    opacity: 0.6,
    fontWeight: "500",
  },
});

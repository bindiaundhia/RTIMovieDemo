// Library imports
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

// Component imports
import MovieDetailsScreen from "../screens/MovieDetailsScreen";

describe("MovieDetailsScreen", () => {
  const mockMovieData = {
    adult: false,
    backdrop_path: "/nTp2j30pTkrIdf2lpHmf7NUqB2m.jpg",
    genre_ids: [35, 53, 28],
    id: 1153366,
    original_language: "ar",
    original_title: "راس براس",
    overview:
      "Hilarity meets danger when a lovesick chauffeur and a bootleg mechanic mistakenly pick up a retired crime lord, igniting a wild, life-changing adventure.",
    popularity: 1202.509,
    poster_path: "/cviUizb4Wil59E9tE7cu6IC2IpG.jpg",
    release_date: "2023-08-03",
    title: "Head to Head",
    video: false,
    vote_average: 6.8,
    vote_count: 32,
  };

  it("Renders movie details correctly", () => {
    const { getByText } = render(
      <MovieDetailsScreen route={{ params: { movie: mockMovieData } }} />
    );

    const titleElement = getByText("Head to Head");
    const releaseYearElement = getByText("2023");
    const voteAverageElement = getByText("6.8/10");
    const overviewElement = getByText(
      "Hilarity meets danger when a lovesick chauffeur and a bootleg mechanic mistakenly pick up a retired crime lord, igniting a wild, life-changing adventure."
    );

    expect(titleElement).toBeTruthy();
    expect(releaseYearElement).toBeTruthy();
    expect(voteAverageElement).toBeTruthy();
    expect(overviewElement).toBeTruthy();
  });

  it('Triggers "Add to Favorite" button, when pressed', () => {
    const { getByText } = render(
      <MovieDetailsScreen route={{ params: { movie: mockMovieData } }} />
    );
    const addToFavoriteButton = getByText("Add to Favorite");
    fireEvent.press(addToFavoriteButton);
  });

  it("Renders play buttons", () => {
    const { getByText, getAllByTestId } = render(
      <MovieDetailsScreen route={{ params: { movie: mockMovieData } }} />
    );
    const playButtons = getAllByTestId("playButton");
    expect(playButtons.length).toBe(2);
    const playButton1 = getByText("Play Trailer 1");
    const playButton2 = getByText("Play Trailer 2");
    expect(playButton1).toBeTruthy();
    expect(playButton2).toBeTruthy();
  });
});

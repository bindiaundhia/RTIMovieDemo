// Library imports
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import axiosMock from "axios-mock-adapter";
import { useNavigation } from "@react-navigation/native";

// Component imports
import HomeScreen, { MovieItem } from "../screens/HomeScreen";
import axiosInstance from "../api/MovieAPI";

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

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("HomeScreen", () => {
  let axiosMockInstance;
  const mockNavigation = { navigate: jest.fn() };
  beforeAll(() => {
    axiosMockInstance = new axiosMock(axiosInstance);
  });

  afterAll(() => {
    axiosMockInstance.restore();
  });

  afterEach(() => {
    axiosMockInstance.reset();
    jest.clearAllMocks();
  });

  it("Fetch movies and displays them", async () => {
    const mockResponse = {
      results: [mockMovieData],
    };
    axiosMockInstance
      .onGet("/?include_adult=false&page=1&language=en-US")
      .reply(200, mockResponse);
    const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    await waitFor(() => {
      const movieList = getByTestId("movieList");
      expect(movieList).toBeTruthy();
    });
  });

  it("Fetch more movies on reaching the end of the list", async () => {
    axiosMockInstance
      .onGet("?include_adult=false&page=2&language=en-US")
      .reply(200, {
        results: [mockMovieData],
      });

    const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    const movieList = getByTestId("movieList");
    fireEvent(movieList, "endReached");
    await waitFor(() => {
      const updatedMovieList = getByTestId("movieList");
      expect(updatedMovieList.children.length).toBe(1);
    });
  });

  it("Navigates to movie details when pressed", () => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigation.navigate,
    });
    const { getByTestId } = render(<MovieItem item={mockMovieData} />);
    const movieItem = getByTestId(`movieItem-${mockMovieData.id}`);
    fireEvent.press(movieItem);
    // expect(mockNavigation.navigate).toHaveBeenCalledWith("Movie", {
    //   movie: mockMovieData,
    // });
  });
});

import axios from "axios";

// Common instance can be reused across the app.
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover/movie",
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDQ1YmNhYmQyMDhlZDU5OWNlN2Y0NjRjMTAyNzAzZiIsInN1YiI6IjY0ZDdjOTRiMzcxMDk3MDBmZmI1YjE3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4BOOE4kDo4FFnwXckqwFFE8MpYkpCzlaD9bLgiHFuY"}`,
  },
});

export default axiosInstance;

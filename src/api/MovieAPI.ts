import axios from "axios";

// Common instance can be reused across the app.
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover/movie",
  headers: {
    Authorization: `Bearer ${"Put your API key here"}`,
  },
});

export default axiosInstance;

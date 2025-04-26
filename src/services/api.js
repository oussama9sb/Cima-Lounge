import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

//Trending

export const fetchTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`,
  );
  return data?.results;
};

//Movies & series details

export const fetchDetails = async (type, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}?api_key=${apiKey}`,
  );
  return data;
};

//Movies recommendations

export const fetchRecommendations = async (type, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}/recommendations?api_key=${apiKey}`,
  );

  return data?.results;
};

//popular Movies

export const fetchPopularMovies = async () => {
  const { data } = await axios.get(
    `${baseUrl}/movie/popular?api_key=${apiKey}`,
  );
  return data?.results;
};

//top rated Movies

export const fetchTopRatedMovies = async () => {
  const { data } = await axios.get(
    `${baseUrl}/movie/top_rated?api_key=${apiKey}`,
  );
  return data?.results;
};

//upcoming Movies

export const fetchUpcomingMovies = async () => {
  const { data } = await axios.get(
    `${baseUrl}/movie/upcoming?api_key=${apiKey}`,
  );
  return data?.results;
};

//popular tv shows

export const fetchPopularTvShows = async () => {
  const { data } = await axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}`);
  return data?.results;
};

//top rated tv shows

export const fetchTopRatedTvShows = async () => {
  const { data } = await axios.get(`${baseUrl}/tv/top_rated?api_key=${apiKey}`);
  return data?.results;
};

//on the air tv shows

export const fetchOnTheAirTvShows = async () => {
  const { data } = await axios.get(
    `${baseUrl}/tv/on_the_air?api_key=${apiKey}`,
  );
  return data?.results;
};

//Discover Movies

export const fetchDiscoverMovie = async () => {
  const { data } = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}`,
  );
  return data?.results;
};

//Movies and series videos

export const fetchVideos = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`,
  );
  return res?.data;
};

//Search

export const searchData = async (query, page) => {
  const res = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`,
  );
  return res?.data;
};

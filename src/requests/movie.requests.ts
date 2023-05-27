import { Movie } from "../types/movie";

const API_URL =
  "https://best-movies-api-cmhx6fsh4a-ew.a.run.app/bestmovies/v1/movies";

export const getMoviesByTitle = async (
  title: string,
  userID: Number
): Promise<Movie[]> => {
  return await fetch(`${API_URL}/title/${title}/${userID}`)
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const getMovieById = async (
  id: string,
  userID: Number
): Promise<Movie> => {
  return await fetch(`${API_URL}/id/${id}/${userID}`)
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw Error(err);
    });
};

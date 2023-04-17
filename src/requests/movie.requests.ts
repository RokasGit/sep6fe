import { Movie } from '../types/movie';

const API_URL = 'http://localhost:3000/bestmovies/v1/movies';

export const getMovieByTitle = async (title: string): Promise<Movie> => {
  return await fetch(`${API_URL}/${title}`)
    .then((response) => response.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });
};

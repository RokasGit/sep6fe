import { Movie } from '../types/movie';

const API_URL = 'http://localhost:3000/bestmovies/v1/toplists';

export const addMovieToToplist = async (
  movie: Movie,
  userId: number
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${movie.ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const getToplist = async (userId: number): Promise<Movie[]> => {
  return await fetch(`${API_URL}/${userId}`)
    .then((response) => response.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });
}

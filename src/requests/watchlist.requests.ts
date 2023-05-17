import { Movie } from '../types/movie';

const API_URL = "http://localhost:3000/bestmovies/v1/watchlists";

export const addMovieToWatchlist = async (
  movie: Movie,
  userId: number
  ): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error: ${error}`);
    return false;
  }
};

export const deleteMovieFromWatchlist = async (
  movie: Movie,
  userId: number
  ): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Received new data", data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const getWatchlist = async (userId: number): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/${userId}}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pepe watchlist", data);
    return data.data;
  } catch (error) {
    console.error(`Error: ${error}`);
    return [];
  }
};

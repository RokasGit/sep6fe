import { Movie } from "../types/movie";

const API_URL =
  "https://best-movies-api-cmhx6fsh4a-ew.a.run.app/bestmovies/v1/watchlists";

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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data);
    }
    return true;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

export const deleteMovieFromWatchlist = async (
  movie: Movie,
  userId: number
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data);
    }
    console.log("Received new data", data);
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data);
    }
    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

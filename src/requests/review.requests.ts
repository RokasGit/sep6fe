import { Review } from "../types/review";
import { API_URL } from "../../external/index";

const Review_url = API_URL + "/reviews";

export const getReviewsBasedOnUserId = async (
  userId: number
): Promise<Review[]> => {
  try {
    const response = await fetch(`${Review_url}/${userId}}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const addReview = async (
  review: Review,
  userId: number
): Promise<string> => {
  try {
    const response = await fetch(`${Review_url}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.status;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const deleteReview = async (
  movieId: string,
  userId: number
): Promise<void> => {
  try {
    const response = await fetch(`${Review_url}/${userId}/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getReviewsBasedOnMovieID = async (
  movieId: string
): Promise<Review[]> => {
  try {
    const response = await fetch(`${Review_url}/allreviews/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw Error(error.message);
  }
};

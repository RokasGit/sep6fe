import { FC, useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { getReviewsBasedOnMovieID } from "../requests/review.requests";
import UserRequests from "../requests/user.requests";
import { ReviewWithUsername } from "../pages/movie";
import { Review } from "../types/review";
import { ReviewCard } from "./review-popUp";

type MovieReviewsProps = {
  reviews: ReviewWithUsername[];
};

const MovieReviews: FC<MovieReviewsProps> = ({ reviews }) => {
  //   //const [reviews, setReviews] = useState<ReviewWithUsername[] | null>(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const reviews = await getReviewsBasedOnMovieID(movieId);
  //       const reviewsWithUsername = reviews.map(async (review) => {
  //         const user = await UserRequests.getUserById(review.userId);
  //         const reviewWithUsername: ReviewWithUsername = {
  //           ...review,
  //           username: user.username,
  //         };
  //         return reviewWithUsername;
  //       });

  //       setReviews(await Promise.all(reviewsWithUsername));
  //       console.log(reviews);
  //     };
  //     fetchData();
  //   }, []);

  return (
    reviews && (
      <Box display="flex" flexDir="column" alignItems="center" mt={4}>
        <Heading size="md" mb={2}>
          User reviews
        </Heading>
        <Box display="flex" flexDir="row" gap={4}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.comment}
              review={review}
              username={review.username}
            />
          ))}
        </Box>
      </Box>
    )
  );
};

export default MovieReviews;

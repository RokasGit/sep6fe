import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Card,
  Flex,
  CardBody,
  Stack,
  Heading,
  Text,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, FC } from "react";
import { addReview } from "../requests/review.requests";
import { Review } from "../types/review";
import { Movie } from "../types/movie";
import { json } from "react-router-dom";

type RateMovieProps = {
  movie: Movie;
  userId: number;
};

type ReviewCardProps = {
  review: Review;
  username?: string;
};

export const ReviewCard: FC<ReviewCardProps> = ({ review, username }) => {
  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="sm"
    >
      <Heading size="md" mb={2} textAlign="center">
        {username ? username : review.movieName}
      </Heading>
      <Box
        display="flex"
        mb={3}
        alignContent={"center"}
        justifyContent={"center"}
      >
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <StarIcon
            key={starIndex}
            color={starIndex <= review.ratting ? "yellow.500" : "gray.300"}
            boxSize="2rem"
          />
        ))}
      </Box>
      <Heading size="md" mb={2}>
        Comment
      </Heading>
      <Text>{review.comment}</Text>
    </Box>
  );
};

const RateMovie: React.FC<RateMovieProps> = ({ movie, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    console.log(movie.review);
    if (movie.review) {
      setReview(movie.review);
    }
  }, []);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Rating can't be zero!");
      return;
    }

    if (comment === "" || comment.length > 500) {
      alert("Comment can't be empty or more than 500 characters!");
      return;
    }

    const reviewToSend: Review = {
      userId: userId,
      movieId: movie.imdbID,
      movieName: movie.Title,
      ratting: rating,
      comment: comment,
      date: new Date(),
    };

    setReview(reviewToSend);

    const status = await addReview(reviewToSend, userId);
    setStatus(status);
    onClose();
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  if (review !== null) {
    return (
      <Button isDisabled={true}>
        <StarIcon />
        <Text ml={1}>Movie rated</Text>
      </Button>
    );
  }

  return (
    <>
      <Button aria-label="Rate Movie" onClick={onOpen}>
        <StarIcon />
        <Text ml={1}>Rate Movie</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rate {movie.Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="md" mb={2}>
              Rating
            </Heading>
            <Box display="flex" mb={3}>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <StarIcon
                  key={starIndex}
                  cursor="pointer"
                  onClick={() => handleStarClick(starIndex)}
                  color={starIndex <= rating ? "yellow.500" : "gray.300"}
                  boxSize="2rem"
                />
              ))}
            </Box>

            <Heading size="md" mb={2}>
              Comment
            </Heading>
            <FormControl>
              <Textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              backgroundColor="#48BB78"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RateMovie;

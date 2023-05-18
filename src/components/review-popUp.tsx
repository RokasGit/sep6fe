import { Box, Button, FormControl, FormLabel, Card, Flex, CardBody, Stack, Heading, Text, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { addReview } from '../requests/review.requests';
import { Review } from "../types/review";
import { Movie } from "../types/movie";
import { json } from "react-router-dom";

type RateMovieProps = {
  movie: Movie;
  userId: number;
};

const ReviewCard = ({ review }: { review: Review }) => {

  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={4} boxShadow="sm">
    <Heading size="md" mb={2}>Review for {review.movieName}</Heading>
    <Box display="flex" mb={3}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <StarIcon
          key={starIndex}
          color={starIndex <= review.ratting ? "yellow.500" : "gray.300"}
          boxSize="2rem"
        />
      ))}
    </Box>

    <Heading size="md" mb={2} >Comment</Heading>
    <Text>{review.comment}</Text>
  </Box>
  );
};


const RateMovie: React.FC<RateMovieProps> = ({ movie, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(''); 
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState<Review | null>(null);

  const handleSubmit = async () => {

    const reviewToSend: Review = {
      userId: userId,
      movieId: movie.imdbID,
      movieName: movie.Title,
      ratting: rating,
      comment: comment,
      date: new Date()
    }

    setReview(reviewToSend);

    const status = await addReview(reviewToSend, userId);
    setStatus(status);
    onClose();
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  if (status === "OK" && review !== null) {
    return <ReviewCard review={review} />;
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
            <Heading size="md" mb={2}>Rating</Heading>
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

            <Heading size="md" mb={2} >Comment</Heading>
            <FormControl>
              <Textarea id="comment" value={comment} onChange={handleCommentChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit} backgroundColor="#48BB78">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RateMovie;

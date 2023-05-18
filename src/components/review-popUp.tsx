import { Box, Button, FormControl, FormLabel, Heading, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton } from "@chakra-ui/react";
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

const RateMovie: React.FC<RateMovieProps> = ({ movie, userId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
       
    const reviewToSend:Review = {
        userId: userId,
        movieId: movie.imdbID,
        ratting: rating,
        comment: comment,
        date: new Date()
    }

    addReview(reviewToSend, userId);
    onClose();
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <>
      <IconButton aria-label="Rate Movie" icon={<StarIcon />} onClick={onOpen} />

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

import React, { FC, useContext, useState } from 'react';
import { WatchlistContext } from '../context/watchlist.context';

import {
  Button, 
  Card,
  CardBody,
  Text,
  Stack,
  Tag,
  Heading,
  Image,
} from '@chakra-ui/react';

import { AddIcon, StarIcon } from '@chakra-ui/icons';

import { Movie } from "../types/movie";

import { deleteMovieFromWatchlist } from '../requests/watchlist.requests';

type WatchlistMovieCardProps = {
    movie: Movie;
  };

const TEMP_USER_ID = 1;

const WatchlistMovieCard: FC<WatchlistMovieCardProps> = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { removeMovie } = useContext(WatchlistContext);

    const handleDeleteFromWatchlist = () => {
      setIsLoading(true);
      deleteMovieFromWatchlist(movie, TEMP_USER_ID).then(()=> {
        removeMovie(movie);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
    }
    
    return (
      <Card maxW="sm" mx={'auto'}>
        <CardBody display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Image
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            w={200}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{movie.Title}</Heading>
            <Stack direction="row" justifyContent="center">
              {movie.Actors &&
                movie.Actors.split(',').map((actor) => (
                  <Tag key={actor} size="md" colorScheme="green">
                    {actor}
                  </Tag>
                ))}
            </Stack>
            <Text>{movie.Plot}</Text>
            <Button
              variant="ghost"
              colorScheme="green"
              leftIcon={<AddIcon />}
              mx={'auto'}
              onClick={handleDeleteFromWatchlist}
              isLoading={isLoading}>
              Delete from watchlist
            </Button>
          </Stack>
        </CardBody>
      </Card>
    );
  };

  export default WatchlistMovieCard;
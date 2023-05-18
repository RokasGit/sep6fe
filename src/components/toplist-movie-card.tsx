import React, { FC, useContext, useState } from 'react';
import { ToplistContext } from '../context/toplist.context';

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

import { deleteMovieFromToplist } from '../requests/toplist.requests';

type ToplistMovieCardProps = {
    movie: Movie;
  };

const TEMP_USER_ID = 1;

const ToplistMovieCard: FC<ToplistMovieCardProps> = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { removeMovie } = useContext(ToplistContext);

    const handleDeleteFromToplist = () => {
      setIsLoading(true);
      deleteMovieFromToplist(movie, TEMP_USER_ID).then(()=> {
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
              onClick={handleDeleteFromToplist}
              isLoading={isLoading}>
              Delete from toplist
            </Button>
          </Stack>
        </CardBody>
      </Card>
    );
  };

  export default ToplistMovieCard;
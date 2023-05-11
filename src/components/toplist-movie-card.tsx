import React, { FC } from 'react';
import { Movie } from "../types/movie";

import {
    Card,
    CardBody,
    Text,
    Stack,
    Tag,
    Heading,
    Image,
} from '@chakra-ui/react';

type ToplistMovieCardProps = {
    movie: Movie;
  };

const ToplistMovieCard: FC<ToplistMovieCardProps> = ({ movie }) => {
    
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
          </Stack>
        </CardBody>
      </Card>
    );
  };

  export default ToplistMovieCard;
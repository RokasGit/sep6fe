import { FC, useState } from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Stack,
  Tag,
  Heading,
  Button,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { Movie } from '../types/movie';

import { addMovieToToplist } from '../requests/toplist.requests';

type MovieCardProps = {
  movie: Movie;
};

const TEMP_USER_ID = 69;

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToToplist = () => {
    setIsLoading(true);
    addMovieToToplist(movie, TEMP_USER_ID)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

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
      <CardFooter>
        <Button
          variant="ghost"
          colorScheme="green"
          leftIcon={<AddIcon />}
          mx={'auto'}
          onClick={handleAddToToplist}
          isLoading={isLoading}>
          Add to toplist
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;

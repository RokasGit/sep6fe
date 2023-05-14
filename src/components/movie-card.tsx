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
  Container,
} from '@chakra-ui/react';

import { AddIcon, StarIcon } from '@chakra-ui/icons';

import { Movie } from '../types/movie';

import RateMovie from '../components/review-popUp'

import { UserContext } from '../context/user.context';

import { addMovieToToplist } from '../requests/toplist.requests';

type MovieCardProps = {
  movie: Movie;
};

const TEMP_USER_ID = 1;

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

  // destructure props of movie
  const {
    Title,
    Year,
    Type,
    Language,
    Genre,
    Poster,
    Director,
    Actors,
    Plot,
    imdbRating,
    imdbVotes,
  } = movie;

  return (
    <Card maxW="2xl" mx={'auto'}>
      <CardBody>
        <Heading
          size="md"
          mb={8}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={3}>
          <Text>
            {Title} ({Year})
          </Text>
          <Container display={'flex'} gap={2} justifyContent={'center'}>
            <Tag size={'md'} colorScheme="gray" justifySelf={'flex-start'}>
              {Type.charAt(0).toUpperCase() + Type.slice(1)}
            </Tag>
            <Tag size={'md'} colorScheme="purple" justifySelf={'flex-start'}>
              {Language}
            </Tag>
            <Tag size={'md'} colorScheme="orange" justifySelf={'flex-start'}>
              {Genre}
            </Tag>
          </Container>
        </Heading>
        <Container
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}>
          <Container flex={2}>
            <Image
              src={Poster}
              alt={`${Title} poster`}
              width={'100%'}
              borderRadius="lg"
            />
          </Container>
          <Stack spacing="3" flex={4}>
            <Stack direction="row" justifyContent="center">
              <Tag size={'md'} colorScheme="blue">
                {Director}
              </Tag>
              {Actors &&
                Actors.split(',').map((actor) => (
                  <Tag key={actor} size="md" colorScheme="green">
                    {actor}
                  </Tag>
                ))}
            </Stack>
            <Text>{Plot}</Text>
            <Container
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={2}>
              <StarIcon />
              <Text>
                {imdbRating} {`(${imdbVotes} votes)`}
              </Text>
            </Container>
            <Button
              variant="ghost"
              colorScheme="green"
              leftIcon={<AddIcon />}
              mx={'auto'}
              onClick={handleAddToToplist}
              isLoading={isLoading}>
              Add to toplist
            </Button>
            <RateMovie userId={TEMP_USER_ID} movie={movie}/>
          </Stack>
        </Container>
      </CardBody>
    </Card>
  );
};

export default MovieCard;

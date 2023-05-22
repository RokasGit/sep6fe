import { FC, useEffect, useState, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

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

import { AddIcon, InfoIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';

import { Movie } from '../types/movie';

import { addMovieToToplist } from '../requests/toplist.requests';

import { addMovieToWatchlist } from '../requests/watchlist.requests';

import { UserContext } from '../context/user.context';

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inToplist, setInToplist] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setInToplist(movie.BelongsToToplist ?? false);
    setInWatchlist(movie.BelongsToWatchlist ?? false);
  }, []);

  const handleAddToToplist = () => {
    setIsLoading(true);
    addMovieToToplist(movie, user?.userId ?? -1)
      .then(() => {
        setInToplist(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleAddToWatchlist = () => {
    setIsLoading(true);
    addMovieToWatchlist(movie, user?.userId ?? -1)
      .then(() => {
        setInWatchlist(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  // destructure props of movie
  const { Poster, Title, Type, Year } = movie;

  const navigate = useNavigate();

  return (
    <Card maxW="2xl" mx={'auto'}>
      <CardBody>
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
            <Stack direction="column" justifyContent="center">
              <Heading
                size="md"
                mb={8}
                display={'flex'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                marginBottom="0vh"
                gap={3}>
                <Text>
                  {Title} ({Year})
                </Text>
                <Container display={'flex'} gap={2} justifyContent={'center'}>
                  <Tag
                    size={'md'}
                    colorScheme="gray"
                    justifySelf={'flex-start'}>
                    {Type && Type?.charAt(0).toUpperCase() + Type?.slice(1)}
                  </Tag>
                </Container>
              </Heading>
              <Button
                variant="ghost"
                colorScheme="green"
                leftIcon={<InfoIcon />}
                mx={'auto'}
                onClick={() => {
                  navigate('/movie', { state: movie.imdbID });
                }}
                isLoading={isLoading}>
                See details
              </Button>
              {user ? (
                <>
                  {inToplist ? (
                    <Button
                      variant="solid"
                      colorScheme="green"
                      leftIcon={<CheckIcon />}
                      mx={'auto'}
                      isLoading={isLoading}>
                      Added to toplist
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      colorScheme="green"
                      leftIcon={<AddIcon />}
                      mx={'auto'}
                      onClick={handleAddToToplist}
                      isLoading={isLoading}>
                      Add to toplist
                    </Button>
                  )}

                  {inWatchlist ? (
                    <Button
                      variant="solid"
                      colorScheme="green"
                      leftIcon={<CheckIcon />}
                      mx={'auto'}
                      isLoading={isLoading}>
                      Added to watchlist
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      colorScheme="green"
                      leftIcon={<AddIcon />}
                      mx={'auto'}
                      onClick={handleAddToWatchlist}
                      isLoading={isLoading}>
                      Add to watchlist
                    </Button>
                  )}
                </>
              ) : null}
            </Stack>
          </Stack>
        </Container>
      </CardBody>
    </Card>
  );
};

export default MovieCard;

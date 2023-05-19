import { useEffect, useState, useContext } from 'react';

import {
  Card,
  CardBody,
  Image,
  Text,
  Stack,
  Tag,
  Heading,
  Button,
  Container,
} from '@chakra-ui/react';
import { Movie } from '../types/movie';
import { useLocation } from 'react-router-dom';
import { getMovieById } from '../requests/movie.requests';
import { AddIcon, StarIcon, CheckIcon } from '@chakra-ui/icons';
import { addMovieToToplist } from '../requests/toplist.requests';
import { addMovieToWatchlist } from '../requests/watchlist.requests';
import RateMovie from '../components/review-popUp'
import { UserContext } from '../context/user.context';

const MoviePage = () => {
    const[movie, setMovie] = useState<Movie| null>(null);
    const[loading, setLoading] = useState(true);
    const [inToplist, setInToplist] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);

    const location = useLocation();
    const{ user } = useContext(UserContext);

    useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          const stateData = location.state;
          const movieDetails = await getMovieById(stateData, user?.userId ?? -1);
          setMovie(movieDetails);
          setInToplist(movieDetails?.BelongsToToplist ?? false);
          setInWatchlist(movieDetails?.BelongsToWatchlist ?? false);
          setLoading(false);
      }
      fetchData();
    },[location.state]);

    const handleAddToToplist = () => {
      setLoading(true);
      addMovieToToplist(movie, user?.userId ?? -1)
        .then(() => {
          setInToplist(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
  
    const handleAddToWatchlist = () => {
      setLoading(true);
      addMovieToWatchlist(movie, user?.userId ?? -1)
        .then(() => {
          setInWatchlist(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };


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
              {movie && movie.Title} ({movie && movie.Year})
            </Text>
            <Container display={'flex'} gap={2} justifyContent={'center'}>
              <Tag size={'md'} colorScheme="gray" justifySelf={'flex-start'}>
                {movie && movie.Type &&  movie?.Type?.charAt(0).toUpperCase() + movie?.Type?.slice(1)}
              </Tag>
              <Tag size={'md'} colorScheme="purple" justifySelf={'flex-start'}>
                {movie && movie.Language}
              </Tag>
              <Tag size={'md'} colorScheme="orange" justifySelf={'flex-start'}>
                {movie && movie.Genre}
              </Tag>
            </Container>
          </Heading>
          <Container
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}>
            <Container flex={2}>
              <Image
                src={movie && movie.Poster}
                alt={`${movie && movie.Title} poster`}
                width={'100%'}
                borderRadius="lg"
              />
            </Container>
            <Stack spacing="3" flex={4}>
              <Stack direction="row" justifyContent="center">
                <Tag size={'md'} colorScheme="blue">
                  {movie && movie.Director}
                </Tag>
                {movie && movie.Actors &&
                  movie.Actors.split(',').map((actor) => (
                    <Tag key={actor} size="md" colorScheme="green">
                      {actor}
                    </Tag>
                  ))}
              </Stack>
              <Text>{movie && movie.Plot}</Text>
              <Container
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}>
                <StarIcon />
                <Text>
                  {movie && movie.imdbRating} {`(${movie && movie.imdbVotes} votes)`}
                </Text>
              </Container>
              <Stack direction="row" justifyContent="center">
              {user ? (
                  <>
                    {inToplist ? (
                      <Button
                        variant="solid"
                        colorScheme="green"
                        leftIcon={<CheckIcon />}
                        mx={'auto'}
                        isLoading={loading}
                      >
                        Added to toplist
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        colorScheme="green"
                        leftIcon={<AddIcon />}
                        mx={'auto'}
                        onClick={handleAddToToplist}
                        isLoading={loading}
                      >
                        Add to toplist
                      </Button>
                    )}

                    {inWatchlist ? (
                      <Button
                        variant="solid"
                        colorScheme="green"
                        leftIcon={<CheckIcon />}
                        mx={'auto'}
                        isLoading={loading}
                      >
                        Added to watchlist
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        colorScheme="green"
                        leftIcon={<AddIcon />}
                        mx={'auto'}
                        onClick={handleAddToWatchlist}
                        isLoading={loading}
                      >
                        Add to watchlist
                      </Button>
                    )}
                  </>
                ) : null}
              </Stack>
              { movie && user ? <RateMovie userId={user?.userId || 0} movie={movie}/> : null}
            </Stack>
          </Container>
        </CardBody>
      </Card> 
    );
}

export default MoviePage;
import React, { FC, useContext, useEffect, useState } from 'react';
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

import { AddIcon, CheckIcon, InfoIcon, MinusIcon, StarIcon } from '@chakra-ui/icons';

import { Movie } from "../types/movie";

import { deleteMovieFromWatchlist } from '../requests/watchlist.requests';
import { UserContext } from '../context/user.context';
import { addMovieToToplist } from '../requests/toplist.requests';
import { useNavigate } from 'react-router-dom';

type WatchlistMovieCardProps = {
    movie: Movie;
  };

const WatchlistMovieCard: FC<WatchlistMovieCardProps> = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [inToplist, setInToplist] = useState(false);

    const { removeMovie } = useContext(WatchlistContext);

    const{ user } = useContext(UserContext);

    useEffect(() =>{
      setInToplist(movie.BelongsToToplist);
    },[]);

    const handleDeleteFromWatchlist = () => {
      setIsLoading(true);
      deleteMovieFromWatchlist(movie, user?.user_id).then(()=> {
        removeMovie(movie);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
    };

    const handleAddToToplist = () => {
      setIsLoading(true);
      addMovieToToplist(movie, user?.user_id)
        .then(() => {
          setInToplist(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };

    const navigate = useNavigate();
    
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
                leftIcon={<InfoIcon />}
                mx={'auto'}
                onClick={()=> {
                  navigate('/movie', {state: movie.imdbID});}}
                isLoading={isLoading}>
                See details
              </Button>
            <Button
              variant="ghost"
              colorScheme="green"
              leftIcon={<MinusIcon />}
              mx={'auto'}
              onClick={handleDeleteFromWatchlist}
              isLoading={isLoading}>
              Delete from watchlist
            </Button>
            {inToplist ? (
                      <Button
                        variant="solid"
                        colorScheme="green"
                        leftIcon={<CheckIcon />}
                        mx={'auto'}
                        isLoading={isLoading}
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
                        isLoading={isLoading}
                      >
                        Add to toplist
                      </Button>
                    )}
          </Stack>
        </CardBody>
      </Card>
    );
  };

  export default WatchlistMovieCard;
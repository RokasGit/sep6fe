import React, { FC, useContext, useEffect, useState } from 'react';

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

import { deleteMovieFromToplist } from '../requests/toplist.requests';
import { UserContext } from '../context/user.context';
import { addMovieToWatchlist } from '../requests/watchlist.requests';
import { useNavigate } from 'react-router-dom';
import { ToplistContext } from '../context/toplist.context';

type ToplistMovieCardProps = {
    movie: Movie;
  };

const ToplistMovieCard: FC<ToplistMovieCardProps> = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);

    const { removeMovie } = useContext(ToplistContext);

    const{ user } = useContext(UserContext);

    useEffect(() =>{
      setInWatchlist(movie.BelongsToWatchlist ?? false);
    },[]);

    const handleDeleteFromToplist = () => {
      setIsLoading(true);
      deleteMovieFromToplist(movie, user?.userId ?? -1).then(()=> {
        removeMovie(movie);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
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
              onClick={handleDeleteFromToplist}
              isLoading={isLoading}>
              Delete from toplist
            </Button>
            {inWatchlist ? (
                      <Button
                        variant="solid"
                        colorScheme="green"
                        leftIcon={<CheckIcon />}
                        mx={'auto'}
                        isLoading={isLoading}
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
                        isLoading={isLoading}
                      >
                        Add to watchlist
                      </Button>
                    )}
          </Stack>
        </CardBody>
      </Card>
    );
  };

  export default ToplistMovieCard;
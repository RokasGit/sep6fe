import React, { useState, useContext, useEffect } from 'react';
import { getWatchlist } from "../requests/watchlist.requests"
import  WatchlistMovieCard  from "../components/watchlist-movie-card"
import { useLocation } from "react-router-dom";
import { WatchlistContext } from '../context/watchlist.context';

import {
    Flex,
    Center,
    Spinner,
    SimpleGrid,
    useTheme,
} from '@chakra-ui/react';

const Watchlist = () => {
    const location =  useLocation();
    const state = location.state;

    const[loading, setLoading] = useState(true);

    const { movies, setMovies } = useContext(WatchlistContext);

    useEffect(() => {
        const fetchData = async () => {
          // state movies is undefined if we are not coming from the home page (MVP)
          if (state && state.movies) {
            setMovies(state.movies);
            setLoading(false);
            return;
          }
          // if we are coming from the home page (MVP), we fetch the movies from the API
            setMovies(await getWatchlist(1));
            setLoading(false);
        }
        fetchData();
    }, []);

    const theme = useTheme();
    const scrollbarWidth = theme.space[2];
    
    return (
        <Center overflowY="scroll" h="92vh" paddingTop="30vh" sx={{ scrollbarWidth }}>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Flex direction="column" overflowY="hidden">
            <SimpleGrid columns={[1, 2, 3]} spacing={10}>
              {movies && movies.map((movie) => (
                <WatchlistMovieCard key={movie.imdbID} movie={movie} />
              ))}
            </SimpleGrid>
          </Flex>
        )}
      </Center>
    ) 
}  

export default Watchlist;

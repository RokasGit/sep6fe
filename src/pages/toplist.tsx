import React, { useState, useContext, useEffect } from 'react';
import { getToplist } from '../requests/toplist.requests';
import ToplistMovieCard from '../components/toplist-movie-card';
import { useLocation } from 'react-router-dom';
import { ToplistContext } from '../context/toplist.context';

import {
  Flex,
  Center,
  Spinner,
  SimpleGrid,
  useTheme,
  Text,
  Box,
} from '@chakra-ui/react';
import { UserContext } from '../context/user.context';

const Toplist = () => {
  const location = useLocation();
  const state = location.state;

  const [loading, setLoading] = useState(true);

  const { movies, setMovies } = useContext(ToplistContext);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user?.userId);
      // state movies is undefined if we are not coming from the home page (MVP)

      if (state && state.movies) {
        setMovies(state.movies);
        setLoading(false);
        return;
      }
      // if we are coming from the home page (MVP), we fetch the movies from the API
      setMovies(await getToplist(user?.userId ?? -1));
      setLoading(false);
    };
    fetchData();
  }, []);

  const theme = useTheme();
  const scrollbarWidth = theme.space[2];

  return (
    <Center overflowY="hidden" h="93vh" w="100vw" sx={{ scrollbarWidth }}>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Flex direction="column" overflowY="scroll" h="inherit" w="inherit">
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
            {movies && movies.length === 0 ? (
              <Box
                width="100vw"
                mt={6}
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Text fontSize="lg">The toplist is empty 😕</Text>
              </Box>
            ) : (
              <>
                {movies &&
                  movies.map((movie) => (
                    <ToplistMovieCard key={movie.imdbID} movie={movie} />
                  ))}
              </>
            )}
          </SimpleGrid>
        </Flex>
      )}
    </Center>
  );
};

export default Toplist;

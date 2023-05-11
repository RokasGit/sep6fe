import React, { useState, useEffect } from 'react';
import { getToplist } from "../requests/toplist.requests"
import { Movie } from "../types/movie";
import  ToplistMovieCard  from "../components/toplist-movie-card"

import {
    Flex,
    Center,
    Spinner,
    SimpleGrid,
    useTheme,
} from '@chakra-ui/react';

const Toplist = () => {
    const[movies, setMovies] = useState<Movie[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setMovies(await getToplist(1));
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
                <ToplistMovieCard key={movie.imdbID} movie={movie} />
              ))}
            </SimpleGrid>
          </Flex>
        )}
      </Center>
    ) 
}  

export default Toplist;

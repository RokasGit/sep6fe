import { useState, ChangeEvent, useContext } from 'react';

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Input,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  useTheme,
  Select
} from '@chakra-ui/react';

import { Movie } from '../types/movie';
import { getMoviesByTitle } from '../requests/movie.requests';

import MovieCard from '../components/movie-card';
import { Actor } from '../types/actor';
import { MovieStatList } from '../components/actor-stat';
import { MovieStat } from '../components/actor-stat';
import { getActorByName } from '../requests/actor.requests';
import { UserContext } from '../context/user.context';

const Mvp = () => {
  const [Title, setTitle] = useState('');
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const [actors, setActor] = useState<Actor[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<'Movies' | 'Actors'>('Movies');

  const{ user } = useContext(UserContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value as 'Movies' | 'Actors');
  };

  const handleSearch = async () => {
    if (!Title) return;

    setIsLoading(true);

    try {

      if (searchType === 'Movies') {
        const movies: Movie[] = await getMoviesByTitle(Title, user?.user_id);
        setMovies(movies);
      } else {
        const actors: Actor[] = await getActorByName(Title);
        setActor(actors);
      }

    } catch (error) {
      console.log(error);
    }

    setTitle('');
    setIsLoading(false);
  };

  const theme = useTheme();
  const scrollbarWidth = theme.space[2];

  return (
    <>
      <Container maxW={'10xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 16, md: 30 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            This is the SEP6 <br />
            <Text as={'span'} color={'green.400'}>
              MVP
            </Text>
          </Heading>
          <Stack
            direction={'column'}
            spacing={10}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Stack direction={'row'} spacing={3} w="100%">

              <Select onChange={handleSearchTypeChange} value={searchType} width="50%">
                <option value='Movies'>Movies</option>
                <option value='Actors'>Actors</option>
              </Select>

              <Input
                placeholder={`Enter ${searchType.toLowerCase()} name`}
                onChange={handleChange}
                value={Title}
              />
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                px={8}
                py={2}
                _hover={{
                  bg: 'green.500',
                }}
                onClick={handleSearch}
                isLoading={isLoading}
              >
                Search
              </Button>

            </Stack>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue('gray.800', 'gray.300')}
                w={71}
                position={'absolute'}
                right={-71}
                top={'10px'}
              />
              <Text
                fontSize={'lg'}
                fontFamily={'Caveat'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                Click me xD
              </Text>
            </Box>
          </Stack>

          {searchType === 'Movies' ? (
            movies && movies.length > 0 ? (
              <Center overflowY="hidden" h="55vh" sx={{ scrollbarWidth }}>
                {isLoading ? (
                  <Spinner size="xl" />
                ) : (
                  <Flex direction="column" overflowY="scroll" h="inherit">
                    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                      {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                      ))}
                    </SimpleGrid>
                  </Flex>
                )}
              </Center>
            ) : (
              <Box></Box>
            )
          ) : (
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {actors && actors.length > 0 && (
                actors.length > 1
                  ? <MovieStatList cardsData={actors} />
                  : <MovieStat actor={actors[0]} spacing={4} />
              )}
            </Box>
          )}

        </Stack>
      </Container>
    </>
  );
};

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

export default Mvp;

import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import UserRequests from '../requests/user.requests';
import {
    Heading,
    Button,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Spinner,
    useColorModeValue,
  } from '@chakra-ui/react';
import { User } from '../types/user';
import { Toplist } from '../types/toplist';
import { Watchlist } from '../types/watchlist';
  
  // type SocialProfileWithImageProps = {
  //   userId: number;
  // }
  const  SocialProfileWithImageCard = () =>
    {
      
    const {id} = useParams();
    const userId = id ? parseInt(id) : -1;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();
    const [toplist, setToplist] = useState<Toplist>();
    const [watchlist, setWatchlist] = useState<Watchlist>();
    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        if (userId === undefined) {
          return;
        }

      await UserRequests.getUserProfile(userId).then((response) => {
        setUser(response.user);
        setToplist(response.toplist);
        setWatchlist(response.watchlist);
        setLoading(false);      
      }).catch((error) => {
        console.log(error);
        setLoading(true);
      });
      }
      fetchData();
    }, [userId]);


    const handleToplist = async () => {
      try {
        navigate('/toplist', {state: {movies: toplist?.movies}});

      }catch(error) {
        console.log(error);
      }
    };
    const handleWatchlist = async () => {
      try {
        navigate('/watchlist', {state: {movies: watchlist?.movies}});
      }catch(error) {
        console.log(error);
      }
    };
    const handleReviews = async () => {
      try {
        navigate('/reviews');
      }catch(error) {
        console.log(error);
      }
    };
    return (
      <Center py={6}>
        {loading ? (
          <Spinner size="xl" />
        ) : (
        <Box
          maxW={'500px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            alt={'header'}
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {user?.username ?? 'Username'}
              </Heading>
              <Text color={'gray.500'}>Movie Enthusiast</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>0</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Reviews
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{toplist?.movies?.length ?? 0}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Movies in the toplist
                </Text>
              </Stack>
            </Stack>
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} w={'full'} align={'center'}>
              <Button
              w={'full'}
              mt={8}
              onClick={handleToplist}
              colorScheme={'green'}
              bg={'green.400'}
              px={8}
              py={2}
              _hover={{
                bg: 'green.500',
              }}>
              Toplist
            </Button>
              </Stack>
              <Stack spacing={0} w={'full'}align={'center'}>
              <Button
              w={'full'}
              mt={8}
              onClick={handleWatchlist}
              colorScheme={'green'}
              bg={'green.400'}
              px={8}
              py={2}
              _hover={{
                bg: 'green.500',
              }}>
              Watchlist
            </Button>
              </Stack>
              <Stack spacing={0} w={'full'} align={'center'}>
              <Button
              w={'full'}
              mt={8}
              onClick={handleReviews}
              colorScheme={'green'}
              bg={'green.400'}
              px={8}
              py={2}
              _hover={{
                bg: 'green.500',
              }}>
              Reviews
            </Button>
              </Stack>
            </Stack>
            
          </Box>
        </Box>
        )}
      </Center>
    );
  }
  export default SocialProfileWithImageCard;
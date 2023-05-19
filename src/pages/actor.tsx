import { useState, ChangeEvent, useEffect } from 'react';

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
} from '@chakra-ui/react';


import { Actor } from '../types/actor';

import { MovieStatList } from '../components/actor-stat';
import { MovieStat } from '../components/actor-stat';
import { getActorByName } from '../requests/actor.requests';

const actorPage = () => {
    const [actorName, setActorName] = useState('');
    const [actors, setActor] = useState<Actor[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setActorName(event.target.value);
    };

    const handleSearchActor = async () => {
        setIsLoading(true);

        try {
            console.log("actor searching: " + actorName);
            const actors: Actor[] = await getActorByName(actorName);
            setActor(actors);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 3 }}
                    py={{ base: 16, md: 30 }}>
                    <Heading fontSize={30}>Search for Actors</Heading>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>
                        <Stack direction={'row'} spacing={3}>
                            <Input
                                placeholder="Enter Actor Name"
                                onChange={handleChange}
                                value={actorName}
                            />
                            <Button
                                colorScheme={'green'}
                                bg={'green.400'}
                                px={6}
                                _hover={{
                                    bg: 'green.500',
                                }}
                                onClick={handleSearchActor}
                                isLoading={isLoading}>
                                Search
                            </Button>
                        </Stack>
                        <Box>
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
                </Stack>
            </Container>
        </>
    );
};

export default actorPage;

import { FC, useState } from 'react';

import {
    Card,
    CardBody,
    Text,
    Stack,
    Tag,
    Heading,
    Flex,
    Stat,
    StatLabel,
    Spacer,
    StatNumber,
    UnorderedList,
    ListItem,
    Box,
} from '@chakra-ui/react';

import { Actor } from '../types/actor';

type ActorCardProps = {
    actor: Actor;
    spacing?: number;
};

const MovieStat: FC<ActorCardProps> = ({ actor, spacing }) => {

    return (
        <Card maxW="sm" mx="auto" p={1} mb={spacing}>
            <CardBody>
                <Flex flexDirection={'row'} justifyContent={'space-between'}>
                    <Stack mr={10}>
                        <Heading size="md">{actor.Name}</Heading>
                        <Text>Popularity: {actor.Popularity}</Text>
                    </Stack>
                
                    <Stack>
                        <Stat>
                            <StatLabel>Average Rating</StatLabel>
                            <StatNumber color="#48BB78">{actor.AverageRating}</StatNumber>
                        </Stat>
                    </Stack>
                </Flex>
                <Heading size="sm" mt={10} mb={5}>Known for:</Heading>
                <UnorderedList spacing={1}>
                    {actor.known_for.map((item: any) => (
                        item && (<ListItem key={item}>{item}</ListItem>)
                    ))}
                </UnorderedList>
            </CardBody>
        </Card>
    );
};


const MovieStatList = ({ cardsData }: { cardsData: Actor[] }) => {
    
    return (

        <Flex
            alignItems="center"
            justifyContent="center"
            minHeight="calc(100vh - 100px)"
            px={4}
        >
            <Box
                maxH="calc(100vh - 100px)"
                overflowY="scroll"
                maxW="sm"
                p={4}
                css={{
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "24px",
                        background: "#888",
                    },
                }}
            >
                {cardsData.map((actor: Actor) => (
                    <MovieStat key={actor.ID} actor={actor} spacing={4} />
                ))}
            </Box>
        </Flex>
    );
};

export { MovieStat, MovieStatList };
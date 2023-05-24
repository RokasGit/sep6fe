import { useState, ChangeEvent, useEffect, useContext } from 'react';

import {
    Flex,
    Center,
    Spinner,
    SimpleGrid,
    useTheme,
    Input,
    Heading,
    Box
} from '@chakra-ui/react';

import { UserContext } from '../context/user.context';
import { Review } from '../types/review';
import { getReviewsBasedOnUserId } from '../requests/review.requests';
import { ReviewCard } from '../components/review-popUp';
import { useLocation } from 'react-router-dom';

const ReviewList = () => {
    const location = useLocation();
    const state = location.state;

    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState<Review[] | null>(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            if (state && state.reviews) {
                setReviews(state.reviews);
                setLoading(false);
                return;
              }
            if (user?.userId) {
                setReviews(await getReviewsBasedOnUserId(user?.userId));
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const theme = useTheme();
    const scrollbarWidth = theme.space[2];

    return (
        <Box>
            <Heading size="lg" textAlign={"center"} mt={5}>Reviews</Heading>
            <Center overflowY="hidden" h="93vh" w="100vw" mt={5} sx={{ scrollbarWidth }}>
                {loading ? (
                    <Spinner size="xl" />
                ) : (
                    <Flex direction="column" overflowY="auto" h="inherit" w="inherit" width={'80%'}>
                        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
                            {reviews && reviews.map((review) => (
                                <ReviewCard key={review.movieId} review={review} />
                            ))}
                        </SimpleGrid>
                    </Flex>
                )}
            </Center>
        </Box>
    )
}  

export default ReviewList;
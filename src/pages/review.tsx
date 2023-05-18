import { useState, ChangeEvent, useEffect, useContext } from 'react';

import {
    Flex,
    Center,
    Spinner,
    SimpleGrid,
    useTheme,
    Input,
} from '@chakra-ui/react';

import { UserContext } from '../context/user.context';
import { Review } from '../types/review';
import { getReviewsBasedOnUserId } from '../requests/review.requests';
import { ReviewCard } from '../components/review-popUp';

const ReviewList = () => {
    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState<Review[] | null>(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
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
        <Center overflowY="hidden" h="93vh" w="100vw" sx={{ scrollbarWidth }}>
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
    )
}  

export default ReviewList;
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ApiService } from '../api-service';
import { IconButton, Stack, Flex, Spacer, useToast } from '@chakra-ui/react';
import { AiOutlineLike, AiOutlineDislike, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const apiService = new ApiService();

export const ReviewList = (props) => {
    const { reviews, selectedAmenity, getReviews, onEditReview, authenticatedUser } = props;
    const toast = useToast();
    const sortedValidReviews = reviews.filter((review) => !review.is_deleted).sort((a, b) => {
        if (a.id < b.id) {
            return 1
        }
        else {
            return -1
        }
    });
    let totalRating = 0;

    sortedValidReviews.forEach((review) => {
        totalRating += review.rating
    });

    const updateReview = async (updatedReview) => {
        try {
            await apiService.updateReview(updatedReview);
            await getReviews();
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteReview = async (deletedReview) => {
        try {
            const confirmation = window.confirm('Are yoy sure you want to delete this review?');
            if (confirmation) {
                await apiService.deleteReview(deletedReview);
                await getReviews();
                toast({
                    title: 'Review Deleted Successfully',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom-right',
                    variant: 'left-accent'
                });
            }
        }
        catch (error) {
            console.log(error);
            toast({
                title: 'Review Delete Failed',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right',
                variant: 'left-accent'
            });
        }
    }


    const averageRating = Math.round(totalRating / sortedValidReviews.length);

    return (
        <>
            {sortedValidReviews.length > 0
                ? <div>

                    <br></br>
                    <div className='AverageRating'>Average Rating: {averageRating} </div>
                    <br></br>


                    <div className='Review'>
                        {sortedValidReviews.map((review) => (

                            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">


                                <div className="ms-2 me-auto max-width">

                                    <hr />
                                    <br></br>

                                    {authenticatedUser?.token?.length > 0
                                        ? <Flex>
                                            <div>
                                                <div>
                                                    User ID: {review.user}

                                                </div>
                                                <div>
                                                    Rating: {review.rating}

                                                </div>
                                            </div>


                                            <Spacer />

                                            <Stack spacing='2px' direction="row">
                                                <IconButton
                                                    colorScheme='blue'
                                                    size='sm'
                                                    variant="outline"
                                                    aria-label='Search database'
                                                    icon={<AiOutlineLike color='black' />}
                                                    onClick={async () => {
                                                        const updatedReview = {
                                                            ...review,
                                                            upvotes: review.upvotes + 1,
                                                            user: review.user,
                                                            amenity_type: selectedAmenity
                                                        };
                                                        await updateReview(updatedReview)

                                                    }}
                                                />
                                                <IconButton
                                                    colorScheme='blue'
                                                    size='sm'
                                                    variant="outline"
                                                    aria-label='Search database'
                                                    icon={<AiOutlineDislike color='black' />}
                                                    onClick={async () => {
                                                        const updatedReview = {
                                                            ...review,
                                                            downvotes: review.downvotes + 1,
                                                            user: review.user,
                                                            amenity_type: selectedAmenity

                                                        };
                                                        await updateReview(updatedReview)

                                                    }}
                                                />
                                                {authenticatedUser?.id === review.user
                                                    ?
                                                    <>
                                                        <IconButton
                                                            colorScheme='blue'
                                                            size='sm'
                                                            variant="outline"
                                                            aria-label='Search database'
                                                            icon={<AiOutlineEdit color='grey' />}
                                                            onClick={() => onEditReview(review)}
                                                        />

                                                        <IconButton
                                                            colorScheme='blue'
                                                            size='sm'
                                                            variant="outline"
                                                            aria-label='Search database'
                                                            icon={<AiOutlineDelete color='red' />}
                                                            onClick={async () => {
                                                                const deletedReview = {
                                                                    ...review,
                                                                    user: review.user,
                                                                    amenity_type: selectedAmenity
                                                                };
                                                                await deleteReview(deletedReview)

                                                            }}

                                                        />
                                                    </>
                                                    : null}
                                            </Stack>
                                        </Flex>
                                        : null}

                                    <div className='fw-bold'>{review.review}</div>

                                    <br></br>
                                    <div style={{ color: 'grey' }}>
                                        Likes: {review.upvotes} | Dislikes: {review.downvotes}

                                    </div>


                                    <br></br>

                                </div>

                            </ListGroup.Item>

                        ))}

                    </div>
                </div>
                : <div className='AverageRating'>
                    No Reviews Yet
                </div>}
        </>
    )

}
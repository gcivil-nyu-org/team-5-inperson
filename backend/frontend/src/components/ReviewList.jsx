import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ApiService } from '../api-service';
import Button from 'react-bootstrap/Button';
import { IconButton, Stack, Flex, Spacer } from '@chakra-ui/react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BiFlag } from 'react-icons/bi';


const apiService = new ApiService();

export const ReviewList = (props) => {

    const { reviews, selectedAmenity, setReviews, authenticatedUser } = props;
    const sortedValidReviews = reviews.filter((review) => !review.is_deleted).sort((a, b) => {
        if (a.id > b.id) {
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
            const updatedReviewResponse = await apiService.updateReview(updatedReview);
            console.log("updatedReviewResponse", updatedReviewResponse)
            const reviewData = await apiService.getReview(selectedAmenity, updatedReview.amenity_id);
            setReviews(reviewData);
        }
        catch (error) {
            console.error(error)

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
                                                <div className="fw-bold">
                                                    User ID: {review.user}

                                                </div>
                                                <div className="fw-bold">
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

                                                <IconButton
                                                    colorScheme='blue'
                                                    size='sm'
                                                    variant="outline"
                                                    aria-label='Search database'
                                                    icon={<BiFlag color='red' />}
                                                    onClick={async () => {
                                                        const updatedReview = {
                                                            ...review,
                                                            user: review.user,
                                                            amenity_type: selectedAmenity
                                                        };
                                                        if (updatedReview.is_flagged === true) {
                                                            updatedReview.is_flagged = false
                                                        }
                                                        else {
                                                            updatedReview.is_flagged = true
                                                        }
                                                        await updateReview(updatedReview)

                                                    }}
                                                />

                                            </Stack>
                                        </Flex>
                                        : null}

                                    {review.review}

                                    <br></br>
                                    <div style={{ color: 'grey' }}>
                                        Likes: {review.upvotes} | Dislikes: {review.downvotes} | Flagged: {String(review.is_flagged)}

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
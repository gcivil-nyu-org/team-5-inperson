import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ApiService } from '../api-service';
import { IconButton, Stack, Flex, Spacer, useToast } from '@chakra-ui/react';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const apiService = new ApiService();

export const ReviewRow = (props) => {

    const { review, authenticatedUser, selectedAmenityType, onEditReview, onUpdateReview } = props;
    const toast = useToast();

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const updateReview = async (updatedReview) => {
        try {
            await apiService.updateReview(updatedReview);
            await onUpdateReview()
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteReview = async (deletedReview) => {
        try {
            const confirmation = window.confirm('Are you sure you want to delete this review?');
            if (confirmation) {
                await apiService.deleteReview(deletedReview);
                await onUpdateReview();
                toast({
                    title: 'Review Deleted Successfully',
                    status: 'success', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                });
            }
        }
        catch (error) {
            console.log(error);
            toast({
                title: 'Review Delete Failed',
                status: 'error', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
            });
        }
    }

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">

            <div className="ms-2 me-auto max-width">

                <hr />
                <br></br>

                {authenticatedUser?.token?.length > 0
                    ? <Flex>
                        <div>
                            <div>
                                User: {review.xyz}
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
                                icon={isLiked ? <AiFillLike color='forestgreen' /> : <AiOutlineLike color='black' />}
                                onClick={async () => {
                                    const shouldUndoDislike = isDisliked && !isLiked
                                    if (shouldUndoDislike) {
                                        setIsDisliked(false);
                                    }
                                    const updatedReview = {
                                        ...review,
                                        upvotes: isLiked ? (review.upvotes - 1) : (review.upvotes + 1),
                                        downvotes: shouldUndoDislike ? (review.downvotes - 1) : (review.downvotes),
                                        user: review.user,
                                        amenity_type: selectedAmenityType
                                    };
                                    setIsLiked(!isLiked)
                                    await updateReview(updatedReview)

                                }}
                            />
                            <IconButton
                                colorScheme='blue'
                                size='sm'
                                variant="outline"
                                aria-label='Search database'
                                icon={isDisliked ? <AiFillDislike color='indianred' /> : <AiOutlineDislike color='black' />}
                                onClick={async () => {
                                    const shouldUndoLike = isLiked && !isDisliked
                                    if (shouldUndoLike) {
                                        setIsLiked(false);
                                    }
                                    const updatedReview = {
                                        ...review,
                                        upvotes: shouldUndoLike ? (review.upvotes - 1) : (review.upvotes),
                                        downvotes: isDisliked ? (review.downvotes - 1) : (review.downvotes + 1),
                                        user: review.user,
                                        amenity_type: selectedAmenityType
                                    };
                                    setIsDisliked(!isDisliked)
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
                                                amenity_type: selectedAmenityType
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
    )
}
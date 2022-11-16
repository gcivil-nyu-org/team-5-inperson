import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ApiService } from '../api-service';
import Button from 'react-bootstrap/Button';

const apiService = new ApiService();

export const ReviewList = (props) => {

    const { reviews, selectedAmenity, setReviews } = props;
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
                    <div className='AverageRating'>Average Rating: {averageRating} </div>
                    <br></br><br></br>


                    <div className='Review'>
                        {sortedValidReviews.map((review) => (

                            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">

                                <div className="ms-2 me-auto">

                                    <div className="fw-bold">
                                        User ID: {review.user}  |  Rating: {review.rating}
                                    </div>

                                    {review.review}

                                    <br></br>

                                    Likes: {review.upvotes} Dislikes: {review.downvotes}
                                    <br></br>

                                    <button className="buttonlike" onClick={async () => {
                                        const updatedReview = {
                                            ...review,
                                            upvotes: review.upvotes + 1
                                        };
                                        await updateReview(updatedReview)

                                    }}>
                                        Like
                                    </button>

                                    <button className="buttonflag" >Flag</button>

                                    <button className="buttondislike" onClick={async () => {
                                        const updatedReview = {
                                            ...review,
                                            downvotes: review.downvotes + 1
                                        };
                                        await updateReview(updatedReview)

                                    }}>
                                        Dislike
                                    </button>

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
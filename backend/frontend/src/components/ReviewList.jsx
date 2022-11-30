import React from 'react';
import { ReviewRow } from './ReviewRow';

export const ReviewList = (props) => {
    const { reviews, selectedAmenityType, onUpdateReview, onEditReview, authenticatedUser } = props;

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
                            <ReviewRow
                                key={review.id}
                                review={review}
                                authenticatedUser={authenticatedUser}
                                selectedAmenityType={selectedAmenityType}
                                onEditReview={onEditReview}
                                onUpdateReview={onUpdateReview}
                            />

                        ))}

                    </div>
                </div>
                : <div className='AverageRating'>
                    No Reviews Yet
                </div>}
        </>
    )

}
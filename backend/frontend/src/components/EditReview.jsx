import React, { useState, useEffect } from 'react';
import { ApiService } from '../api-service';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { IconButton, Stack, Flex, Spacer } from '@chakra-ui/react';
import { AiOutlineLike, AiOutlineDislike, AiOutlineDelete , AiOutlineEdit} from 'react-icons/ai';
const apiService = new ApiService();
var Filter = require('bad-words'),
    filter = new Filter();

export const EditReview = (props) => {
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

    
}
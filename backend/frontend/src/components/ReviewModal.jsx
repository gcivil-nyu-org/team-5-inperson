import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { ApiService } from '../api-service';
import { useToast } from '@chakra-ui/react'

const apiService = new ApiService();

var Filter = require('bad-words'),
    filter = new Filter();

export const ReviewModal = (props) => {
    const { selectedAmenityType, selectedAmenityId, authenticatedUser, selectedReview, showReviewModal, onModalClose, onReviewSubmit } = props;
    
    const [inputs, setInputs] = useState({ rating: "", review: "" });
    const toast = useToast();

    const isNewReview = !Boolean(selectedReview?.rating);

    useEffect(() => {
        setInputs({
            rating: selectedReview.rating,
            review: selectedReview.review,
        });
    }, [selectedReview]);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    const clearForm = () => {
        inputs.review = "";
        inputs.rating = "";
    };

    const clearAndCloseModal = () => {
        clearForm();
        onModalClose();
    };

    const submitReview = async (event) => {
        event.preventDefault();
        // Error validation
        if (inputs.review.length > 250) {
            toast({
                title: 'Review Length Exceeded',
                description: "Please enter a shorter review",
                status: 'error', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
            })
        } else {
            if (isNewReview) {
                const newReview = {
                    amenity_type: selectedAmenityType,
                    amenity_id: selectedAmenityId,
                    rating: inputs.rating,
                    review: filter.clean(inputs.review),
                    is_flagged: false,
                    is_deleted: false,
                    upvotes: 0,
                    downvotes: 0,
                    user: authenticatedUser.id
                }

                try {
                    await apiService.addReview(newReview);
                    toast({
                        title: 'Review Successfully Added',
                        status: 'success', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                } catch {
                    toast({
                        title: 'Add Review Failed. Please try again.',
                        status: 'error', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                }
            } else {
                const updatedReview = {
                    ...selectedReview,
                    rating: inputs.rating,
                    review: filter.clean(inputs.review)
                };
                try {
                    await apiService.updateReview(updatedReview);
                    toast({
                        title: 'Review Successfully Edited',
                        status: 'success', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                } catch {
                    toast({
                        title: 'Edit Review Failed. Please try again.',
                        status: 'error', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                }
            }
            await onReviewSubmit();
            clearAndCloseModal();
        }
    }


    return (
        <Modal show={showReviewModal} onHide={clearAndCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{isNewReview ? 'New' : 'Edit'} Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitReview}>

                    <label>Rating (1-5):
                        <input
                            type="number"
                            name="rating"
                            value={inputs.rating || ""}
                            required="required"
                            onChange={handleInputChange}
                            min={1}
                            max={5}
                        />
                    </label>

                    <label>Review:
                        <textarea
                            type="text"
                            name="review"
                            value={inputs.review || ""}
                            required="required"
                            onChange={handleInputChange}
                            cols="40"
                            rows="5" />
                    </label>

                    <label class="char-count">chars {inputs?.review?.length}/250</label>

                    <input type="submit" />
                </form>
            </Modal.Body>
        </Modal>
    )


}
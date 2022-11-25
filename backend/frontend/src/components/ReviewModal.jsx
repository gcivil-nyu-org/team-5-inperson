import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { ApiService } from '../api-service';
import { useToast } from '@chakra-ui/react'

const apiService = new ApiService();

var Filter = require('bad-words'),
    filter = new Filter();

export const ReviewModal = (props) => {

    const { selectedAmenity, selectedAmenityId, authenticatedUser, setShowReviewModal, showReviewModal, getReviews } = props;

    const [inputs, setInputs] = useState({rating:"", review:""});
    const toast = useToast()
    
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitReview = async (event) => {
        event.preventDefault();

        if (inputs.rating > 5) {
            toast({
                title: 'Please insert a Rating from 1-5',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right',
                variant: 'left-accent'
            })

        } else if (inputs.rating < 1) {
            toast({
                title: 'Please insert a Rating from 1-5',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right',
                variant: 'left-accent'
            })

        } else if (inputs.rating === undefined || inputs.rating === "") {
            toast({
                title: 'Please insert a Rating',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right',
                variant: 'left-accent'
            })

        } else if (inputs.review === undefined || inputs.review === "") {
            toast({
                title: 'Please insert a Review',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right',
                variant: 'left-accent'
            })

        } else if (inputs.review.length > 250) {
            toast({
                title: 'Review Length Exceeded',
                description: "Please enter a shorter review",
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right',
                variant: 'left-accent'
            })

        } else {

            const newReview = {
                amenity_type: selectedAmenity,
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
                const addReviewResponse = await apiService.addReview(newReview);
                await getReviews()

                toast({
                    title: 'Review Successfully Submitted',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom-right',
                    variant: 'left-accent'
                })
                
            }
            catch {
                toast({
                    title: 'Add Review Failed. Please try again.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom-right',
                    variant: 'left-accent'
                })
            }

            closeReviewModal()
            
        }
    }

    const clearForm = () => {
        inputs.review = ""
        inputs.rating = ""
    }

    const closeReviewModal = () => {
        setShowReviewModal(false)
        clearForm()
    }


    return (
        <Modal show={showReviewModal} onHide={() => closeReviewModal()}>
            <Modal.Header closeButton>
                <Modal.Title>New Review</Modal.Title>
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
                        {/* <input
                            type="text"
                            name="review"
                            value={inputs.review || ""}
                            required="required"
                            onChange={handleInputChange}
                        /> */}
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
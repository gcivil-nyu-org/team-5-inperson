import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { ApiService } from '../api-service';

const apiService = new ApiService();

var Filter = require('bad-words'),
    filter = new Filter();

export const ReviewModal = (props) => {

    const { selectedAmenity, selectedAmenityId, authenticatedUser, setShowReviewModal, showReviewModal } = props;

    const [inputs, setInputs] = useState({});
    
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitReview = async (event) => {
        event.preventDefault();

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

        const addReviewResponse = await apiService.addReview(newReview);

        setShowReviewModal(false)

        if (inputs.rating > 5) {
            alert('Please insert a Rating from 1-5')
            refreshForm()
        } else if (inputs.rating < 1) {
            alert('Please insert a Rating from 1-5')
            refreshForm()
        } else if (inputs.rating === undefined || inputs.rating === "") {
            alert('Please insert a Rating')
            refreshForm()
        } else if (inputs.review === undefined || inputs.review === "") {
            alert('Please insert a Review')
            refreshForm()
        } else {
            alert('Review Successfully Submitted')
            refreshPage()
        }
    }

    const refreshForm = () => {
        inputs.review = ""
        inputs.rating = ""
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
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
                        <input
                            type="text"
                            name="review"
                            value={inputs.review || ""}
                            required="required"
                            onChange={handleInputChange}
                        />
                    </label>
                    <input type="submit" />
                </form>
            </Modal.Body>
        </Modal>
    )


}
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ApiService } from '../api-service';
import Button from 'react-bootstrap/Button';
import { IconButton, Stack, Flex, Spacer } from '@chakra-ui/react';
import { AiOutlineLike, AiOutlineDislike, AiOutlineDelete } from 'react-icons/ai';
import { BiFlag } from 'react-icons/bi';
import Modal from 'react-bootstrap/Modal';
import { Filters } from './Filters';
import { ToastContainer } from 'react-toastify';
const apiService = new ApiService();
var Filter = require('bad-words'),
    filter = new Filter();
export const AddReview = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')))
    const [reviews, setReviews] = useState([]);
    //const [selectedAmenity, setSelectedAmenity] = useState("");
    //const [selectedAmenityId, setSelectedAmenityId] = useState("");
    useEffect(() => {
        const onStorage = () => {
            setAuthenticatedUser(JSON.parse(localStorage.getItem('authenticatedUser')))
        };

        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener('storage', onStorage);
        };
    }, [])
    
    //console.log("authenticatedUser", authenticatedUser)

    const {refreshForm, refreshPage, setShowModal, showModal, selectedAmenity, selectedAmenityId} = props;
        
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);

        const newReview = {
            amenity_type: selectedAmenity,
            amenity_id: selectedAmenityId,
            rating: inputs.rating,
            review: filter.clean(inputs.review),
            is_flagged: false,
            is_deleted: false,
            upvotes: 0,
            downvotes: 0,
            user: authenticatedUser.username
        }

        console.log("newReview", newReview)
        const addReviewResponse = await apiService.addReview(newReview);
        console.log("addReviewResponse", addReviewResponse)


        setShowModal(false)

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
    
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                {/* <label>{amenity_type} {amenity_id} </label> */}
                                <label>Rating (1-5):
                                    <input
                                        type="number"
                                        name="rating"
                                        value={inputs.rating || ""}
                                        required="required"
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                    />
                                </label>
                                <input type="submit"
                                />
                                <ToastContainer />
                            </form>
                        </Modal.Body>
                    </Modal>
    )
}
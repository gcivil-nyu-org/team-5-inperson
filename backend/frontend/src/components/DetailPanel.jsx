import React, { useState, useEffect } from 'react'
import { Offcanvas, Button } from 'react-bootstrap';
import { ReviewModal } from './ReviewModal';
import { ReviewList } from './ReviewList';
import { ApiService } from '../api-service';
import { Badge, Text } from '@chakra-ui/react'

export const DetailPanel = (props) => {

    const { selectedAmenityType, authenticatedUser, showDetailPanel, setShowDetailPanel,
        calculateRoute, mapCenter, destLat, destLng, selectedAmenityId } = props;

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState({});

    const getReviews = async () => {
        if (selectedAmenityType && selectedAmenityId) {
            const apiService = new ApiService();
            const reviewData = await apiService.getReview(selectedAmenityType, selectedAmenityId);
            setReviews(reviewData);
        }
    }


    useEffect(() => {
        getReviews();
    }, [selectedAmenityType, selectedAmenityId]);

    return (
        <>
            <Offcanvas show={showDetailPanel} onHide={() => setShowDetailPanel(false)} scroll={false} backdrop={false} placement={'start'}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ width: "100%", textAlign: "center" }}>
                        <Text fontSize='xl' fontWeight='bold'>
                            <Badge variant='subtle' ml='1' fontSize='2em' colorScheme='green'>
                                {selectedAmenityType.toUpperCase()}
                            </Badge>
                        </Text>
                        <Text fontSize='sm' style={{color:'grey'}}>
                            ID: {selectedAmenityId}
                        </Text>

                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Button variant="primary"
                        onClick={() => {
                            calculateRoute()
                            setShowDetailPanel(false)
                        }}
                    >
                        Show Path
                    </Button>{' '}

                    <a className="btn btn-primary"
                        href={`https://www.google.com/maps?saddr=${mapCenter.lat},${mapCenter.lng}&daddr=${destLat},${destLng}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GMaps Nav
                    </a>
                    <br></br>

                    {authenticatedUser?.token?.length > 0
                        ? <Button variant="primary" onClick={() => { setShowReviewModal(true) }}>Add Review</Button>
                        : null}


                    <ReviewList
                        reviews={reviews}
                        selectedAmenityType={selectedAmenityType}
                        authenticatedUser={authenticatedUser}
                        getReviews={getReviews}
                        onEditReview={(review) => {
                            setSelectedReview(review);
                            setShowReviewModal(true);
                        }}
                    />

                </Offcanvas.Body>
            </Offcanvas>

            <ReviewModal
                selectedAmenityType={selectedAmenityType}
                selectedAmenityId={selectedAmenityId}
                authenticatedUser={authenticatedUser}
                onModalClose={() => {
                    // Resetting selected review when modal is closed
                    setSelectedReview({});
                    setShowReviewModal(false);
                }}
                onReviewSubmit={async () => {
                    // To-be called after the modal is submitted
                    await getReviews();
                }}
                showReviewModal={showReviewModal}
                selectedReview={selectedReview}
            />
        </>
    )
}
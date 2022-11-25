import React, { useState, useEffect } from 'react'
import { Offcanvas, Button } from 'react-bootstrap';
import { ReviewModal } from './ReviewModal';
import { ReviewList } from './ReviewList';
import { ApiService } from '../api-service';
import { Badge, Text } from '@chakra-ui/react'

export const DetailPanel = (props) => {

    const { selectedAmenity, authenticatedUser, showDetailPanel, setShowDetailPanel,
        calculateRoute, mapCenter, destLat, destLng, selectedAmenityId } = props;

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);

    const getReviews = async () => {
        if (selectedAmenity && selectedAmenityId) {
            const apiService = new ApiService();
            const reviewData = await apiService.getReview(selectedAmenity, selectedAmenityId);
            setReviews(reviewData);
        }

    }


    useEffect(() => {


        getReviews()

    }, [selectedAmenity, selectedAmenityId])

    return (
        <>
            <Offcanvas show={showDetailPanel} onHide={() => setShowDetailPanel(false)} scroll={false} backdrop={false} placement={'start'}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ width: "100%", textAlign: "center" }}>
                        <Text fontSize='xl' fontWeight='bold'>
                            <Badge variant='subtle' ml='1' fontSize='2em' colorScheme='green'>
                                {selectedAmenity.toUpperCase()}
                            </Badge>
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
                    >
                        GMaps Nav
                    </a>
                    <br></br>

                    {authenticatedUser?.token?.length > 0
                        ? <Button variant="primary" onClick={() => { setShowReviewModal(true) }}>Add Review</Button>
                        : null}


                    <ReviewList
                        reviews={reviews}
                        selectedAmenity={selectedAmenity}
                        authenticatedUser={authenticatedUser}
                        getReviews={getReviews}

                    />

                </Offcanvas.Body>
            </Offcanvas>

            <ReviewModal
                selectedAmenity={selectedAmenity}
                selectedAmenityId={selectedAmenityId}
                authenticatedUser={authenticatedUser}
                setShowReviewModal={setShowReviewModal}
                showReviewModal={showReviewModal}
                getReviews={getReviews}
            />
        </>
    )
}
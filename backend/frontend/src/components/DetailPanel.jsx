import React, {useState} from 'react'
import { Offcanvas, Button } from 'react-bootstrap';
import { ReviewModal } from './ReviewModal';
import { ReviewList } from './ReviewList';

export const DetailPanel = (props) => {


    const { selectedAmenity, authenticatedUser, reviews, setReviews, showDetailPanel, setShowDetailPanel,
        calculateRoute, mapCenter, destLat, destLng, selectedAmenityId} = props;

    const [showReviewModal, setShowReviewModal] = useState(false);

    return (
        <>
            <Offcanvas show={showDetailPanel} onHide={() => setShowDetailPanel(false)} scroll={false} backdrop={false} placement={'start'}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {selectedAmenity.toUpperCase()}
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
                        setReviews={setReviews}
                        authenticatedUser={authenticatedUser}
                    />



                </Offcanvas.Body>
            </Offcanvas>

            <ReviewModal
                selectedAmenity = {selectedAmenity}
                selectedAmenityId = {selectedAmenityId}
                authenticatedUser = {authenticatedUser}
                setShowReviewModal = {setShowReviewModal}
                showReviewModal = {showReviewModal}
            />
        </>
    )
}
import '../styles/Form.css';
import React, { useState, useEffect } from 'react'
import {
    GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, Autocomplete,
} from '@react-google-maps/api';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import {
    IconButton, SkeletonText, Flex, Stack, Box, ButtonGroup, Spacer, Tooltip, Center
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { ApiService } from '../api-service';
import { Filters } from './Filters';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReviewList } from './ReviewList';

const containerStyle = {
    width: '100vw',
    height: '92vh'
};

var user = 1;

const apiService = new ApiService();

var Filter = require('bad-words'),
    filter = new Filter();

export const GoogleMapContainer = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')))

    useEffect(() => {
        const onStorage = () => {
            setAuthenticatedUser(JSON.parse(localStorage.getItem('authenticatedUser')))
        };

        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener('storage', onStorage);
        };
    }, [])

    console.log("authenticatedUser", authenticatedUser)

    const { waterAmenities, toiletAmenities, wifiAmenities, benchAmenities, parkingAmenities,
        mapCenter, setMapCenter,
        waterOn, wifiOn, benchOn, parkingOn, toiletOn,
        setWaterOn, setWifiOn, setBenchOn, setParkingOn, setToiletOn } = props;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const [isReallyLoaded, setIsReallyLoaded] = React.useState(false);

    setTimeout(() => {
        setIsReallyLoaded(true);
    }, 200);

    const [show, setShow] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [destLat, setDestLat] = useState('')
    const [destLng, setDestLng] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [selectedAmenity, setSelectedAmenity] = useState("");
    const [selectedAmenityId, setSelectedAmenityId] = useState("");

    const codepoints = {
        water: "\ue798",
        wifi: "\ue63e",
        bench: "\uefee",
        toilet: "\ue63d",
        parking: "\ue54f"
    }

    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete)
    }

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace()
            console.log(place.geometry.location.lat(), place.geometry.location.lng())
            const searchLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setMapCenter(searchLocation)
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    async function calculateRoute() {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const destination = { lat: destLat, lng: destLng }
        if (destLat === '' || destLng === '')
            return
        const results = await directionsService.route({
            origin: mapCenter,
            destination: destination,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.WALKING

        })
        setDirectionsResponse(results)
        // setDistance(results.routes[0].legs[0].distance.text)
        // setDuration(results.routes[0].legs[0].duration.text)
        console.log(('found directions'))
    }

    function clearRoute() {
        setDirectionsResponse(null)
        // setDistance('')
        // setDuration('')
        setDestLat('')
        setDestLng('')
        //setMap(map)
        map.panTo(mapCenter)
    }

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
            user: authenticatedUser.id
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

    const refreshForm = () => {
        inputs.review = ""
        inputs.rating = ""
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return isLoaded ? (

        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={17}
            options={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
            }}
            onLoad={map => setMap(map)}
        >
            {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}

            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `300px`,
                        height: `40px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `16px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "20px",
                        top: "20px",
                        backgroundColor: "white"
                    }}
                />
            </Autocomplete>

            <Offcanvas show={show} onHide={() => setShow(false)} scroll={false} backdrop={false} placement={'start'}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {selectedAmenity.toUpperCase()}
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Button variant="primary"
                        onClick={() => {
                            calculateRoute()
                            setShow(false)
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

                    <Button variant="primary" onClick={() => { setShowModal(true) }}>Add Review</Button>


                    <ReviewList
                        reviews={reviews}
                        selectedAmenity={selectedAmenity}
                        setReviews={setReviews}
                    />
                    {console.log("reviews", reviews)}

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

                </Offcanvas.Body>
            </Offcanvas>


            {isReallyLoaded ?
                <>

                    <Marker
                        var position={mapCenter} />

                    {waterOn ?
                        waterAmenities.map((waterAmenity) => (
                            <Marker
                                key={waterAmenity.id}
                                label={{
                                    text: codepoints.water,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: waterAmenity.water_latitude, lng: waterAmenity.water_longitude }}
                                onClick={async () => {
                                    setDestLat(waterAmenity.water_latitude);
                                    setDestLng(waterAmenity.water_longitude);
                                    setSelectedAmenity('water');
                                    setSelectedAmenityId(waterAmenity.id)

                                    const reviewData = await apiService.getReview('water', waterAmenity.id);

                                    setReviews(reviewData);
                                    setShow(true)
                                }} />
                        ))
                        : null}

                    {toiletOn ?
                        toiletAmenities.map((toiletAmenity) => (
                            <Marker
                                key={toiletAmenity.id}
                                label={{
                                    text: codepoints.toilet,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: toiletAmenity.toilet_latitude, lng: toiletAmenity.toilet_longitude }}
                                onClick={async () => {
                                    setDestLat(toiletAmenity.toilet_latitude)
                                    setDestLng(toiletAmenity.toilet_longitude)
                                    setSelectedAmenity('toilet');
                                    setSelectedAmenityId(toiletAmenity.id)

                                    const reviewData = await apiService.getReview('toilet', toiletAmenity.id);

                                    setReviews(reviewData);
                                    setShow(true)
                                }} />
                        ))
                        : null}

                    {wifiOn ?
                        wifiAmenities.map((wifiAmenity) => (
                            <Marker
                                key={wifiAmenity.id}
                                label={{
                                    text: codepoints.wifi,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: wifiAmenity.wifi_latitude, lng: wifiAmenity.wifi_longitude }}
                                onClick={async () => {
                                    setDestLat(wifiAmenity.wifi_latitude)
                                    setDestLng(wifiAmenity.wifi_longitude)
                                    setSelectedAmenity('wifi');
                                    setSelectedAmenityId(wifiAmenity.id)

                                    const reviewData = await apiService.getReview('wifi', wifiAmenity.id);

                                    setReviews(reviewData);
                                    setShow(true)
                                }} />
                        ))
                        : null}

                    {parkingOn ?
                        parkingAmenities.map((parkingAmenity) => (
                            <Marker
                                key={parkingAmenity.id}
                                label={{
                                    text: codepoints.parking,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: parkingAmenity.parking_latitude, lng: parkingAmenity.parking_longitude }}
                                onClick={async () => {
                                    setDestLat(parkingAmenity.parking_latitude)
                                    setDestLng(parkingAmenity.parking_longitude)
                                    setSelectedAmenity('parking');
                                    setSelectedAmenityId(parkingAmenity.id)

                                    const reviewData = await apiService.getReview('parking', parkingAmenity.id);

                                    setReviews(reviewData);
                                    setShow(true)
                                }} />
                        ))
                        : null}

                    {benchOn ?
                        benchAmenities.map((benchAmenity) => (
                            <Marker
                                key={benchAmenity.id}
                                label={{
                                    text: codepoints.bench,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: benchAmenity.bench_latitude, lng: benchAmenity.bench_longitude }}
                                onClick={async () => {
                                    setDestLat(benchAmenity.bench_latitude)
                                    setDestLng(benchAmenity.bench_longitude)
                                    setSelectedAmenity('bench');
                                    setSelectedAmenityId(benchAmenity.id)

                                    const reviewData = await apiService.getReview('bench', benchAmenity.id);

                                    setReviews(reviewData);
                                    setShow(true)
                                }} />
                        ))
                        : null}
                </>
                : null}

            <Flex>
                <Spacer />

                <Filters
                    waterOn={waterOn}
                    wifiOn={wifiOn}
                    benchOn={benchOn}
                    parkingOn={parkingOn}
                    toiletOn={toiletOn}
                    setWaterOn={setWaterOn}
                    setWifiOn={setWifiOn}
                    setBenchOn={setBenchOn}
                    setParkingOn={setParkingOn}
                    setToiletOn={setToiletOn}

                />
                <Spacer />

                <Box borderRadius='lg' p={5} shadow='base'
                    pt={{ base: '36', sm: '5', md: '5', lg: '5', xl: '5' }}
                    pl={{ base: '0', sm: '5', md: '5', lg: '5', xl: '5' }}
                    ml={{ base: '-20', sm: '-20', md: '-20', lg: '-20', xl: '-20' }}
                >

                    <ButtonGroup>
                        <Stack spacing={2} justifyContent='space-between' direction="column">
                            <Tooltip hasArrow label='Recenter Map' placement='left' openDelay="500">
                                <IconButton
                                    aria-label='center back'
                                    icon={<FaLocationArrow />}
                                    colorScheme="green"
                                    onClick={() => { map.panTo(mapCenter) }}
                                />
                            </Tooltip>

                            {directionsResponse ?
                                <Tooltip hasArrow label='Clear Navigation' placement='left' openDelay="500">
                                    <IconButton
                                        aria-label='center back'
                                        icon={<FaTimes />}
                                        colorScheme="green"
                                        onClick={() => { clearRoute() }}
                                    />
                                </Tooltip> : null}
                        </Stack>
                    </ButtonGroup>

                </Box>
            </Flex >
        </GoogleMap>

    ) : <SkeletonText />

}


import '../styles/Form.css';
import React, { useState } from 'react'
import {
    GoogleMap, useJsApiLoader,
    Marker,
    DirectionsRenderer,
    Autocomplete,
} from '@react-google-maps/api';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import {
    IconButton, SkeletonText, Flex, Stack, Box,
    ButtonGroup, Spacer, Center, WrapItem, Wrap, Tooltip
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { ApiService } from '../api-service';
import parse from 'html-react-parser';
import { Filters } from './Filters';

const containerStyle = {
    width: '100vw',
    height: '92vh'
};

var offcanvastitle = '';
var reviewlist = '';
var rating_average = '';

const mapStyle =
    [
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        }
    ]



export const GoogleMapContainer = (props) => {

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
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [destLat, setDestLat] = useState('')
    const [destLng, setDestLng] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const codepoints = {
        water: "\ue798",
        wifi: "\ue63e",
        bench: "\uefee",
        toilet: "\ue63d",
        parking: "\ue54f"
    }

    const onLoad = (autocomplete) => {
        console.log('autocomplete: ', autocomplete)
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
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        console.log(('found directions'))
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setDestLat('')
        setDestLng('')
        //setMap(map)
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
                // styles: {mapStyle}
            }}
            onLoad={map => setMap(map)}
        // customMapStyle={mapStyle}
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
                        // left: "48%",
                        left: "20px",
                        top: "20px",
                        // marginLeft: "-120px",
                        backgroundColor: "white"
                    }}
                />
            </Autocomplete>

            <Offcanvas show={show} onHide={handleClose} scroll={false} backdrop={false} placement={'start'}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{offcanvastitle}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Button variant="primary"
                        onClick={() => {
                            calculateRoute()
                            handleClose()
                        }}>
                        Navigate Here
                    </Button>{' '}

                    <br></br>

                    <Button variant="primary"
                    >
                        <a href={`https://www.google.com/maps?saddr=${mapCenter.lat},${mapCenter.lng}&daddr=${destLat},${destLng}`} target="_blank">Open with GoogleMaps</a>

                    </Button>{' '}
                    <br></br><br></br>

                    <div className='AverageRating'> {rating_average} </div>
                    <br></br><br></br>

                    <div className='Review'> {parse(reviewlist)} </div>
                    <br></br><br></br>

                    <button className="buttonaddreview">Add Review</button>
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
                                onClick={() => {

                                    setDestLat(waterAmenity.water_latitude)
                                    setDestLng(waterAmenity.water_longitude)

                                    const apiService = new ApiService();
                                    const reviewDataPromise = apiService.getReview('water', waterAmenity.id);

                                    reviewDataPromise.then((reviewData) => {

                                        var average_rating = 0;
                                        var undeleted_reviews = 0;

                                        reviewlist = '<ListGroup>';
                                        for (let i = 0; i < reviewData.length; i++) {
                                            if (reviewData[i].is_deleted === false) {
                                                reviewlist = reviewlist.concat(`<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                                
                                                <div className="ms-2 me-auto">
                                                 
                                                    <div className="fw-bold">User ID: ${reviewData[i].user}  |  Rating: ${reviewData[i].rating} </div>
                                                        ${reviewData[i].review}
                                                        <br></br>
                                                        Likes: ${reviewData[i].upvotes} Dislikes: ${reviewData[i].downvotes} 
                                                        <br></br>
                                                        <button className="buttonlike">Like</button> <button className="buttonflag">Flag</button> <button className="buttondislike">Dislike</button>
                                                    </div>
                                                    
                                                </ListGroup.Item>
                                                `);
                                                average_rating = average_rating + reviewData[i].rating;
                                                undeleted_reviews++;

                                            }
                                        }
                                        average_rating = average_rating / undeleted_reviews;
                                        reviewlist = reviewlist.concat('</ListGroup>');

                                        offcanvastitle = 'Water Amenity, ID:' + waterAmenity.id + ' ';
                                        if (undeleted_reviews > 0) {
                                            rating_average = "Average Rating: " + average_rating;
                                        } else {
                                            rating_average = 'No Reviews Yet';
                                        }
                                        handleShow();
                                    });
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
                                onClick={() => {

                                    setDestLat(toiletAmenity.toilet_latitude)
                                    setDestLng(toiletAmenity.toilet_longitude)

                                    const apiService = new ApiService();
                                    const reviewDataPromise = apiService.getReview('toilet', toiletAmenity.id);

                                    reviewDataPromise.then((reviewData) => {

                                        var average_rating = 0;
                                        var undeleted_reviews = 0;

                                        reviewlist = '<ListGroup>';
                                        for (let i = 0; i < reviewData.length; i++) {
                                            if (reviewData[i].is_deleted === false) {
                                                reviewlist = reviewlist.concat(`<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                                
                                                <div className="ms-2 me-auto">
                                                 
                                                    <div className="fw-bold">User ID: ${reviewData[i].user}  |  Rating: ${reviewData[i].rating} </div>
                                                        ${reviewData[i].review}
                                                        <br></br>
                                                        Likes: ${reviewData[i].upvotes} Dislikes: ${reviewData[i].downvotes} 
                                                        <br></br>
                                                        <button className="buttonlike">Like</button> <button className="buttonflag">Flag</button> <button className="buttondislike">Dislike</button>
                                                    </div>
                                                    
                                                </ListGroup.Item>
                                                `);
                                                average_rating = average_rating + reviewData[i].rating;
                                                undeleted_reviews++;

                                            }
                                        }
                                        average_rating = average_rating / undeleted_reviews;
                                        reviewlist = reviewlist.concat('</ListGroup>');

                                        offcanvastitle = 'Toilet Amenity, ID:' + toiletAmenity.id + ' ';
                                        if (undeleted_reviews > 0) {
                                            rating_average = "Average Rating: " + average_rating;
                                        } else {
                                            rating_average = 'No Reviews Yet';
                                        }
                                        handleShow();
                                    });
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
                                onClick={() => {

                                    setDestLat(wifiAmenity.wifi_latitude)
                                    setDestLng(wifiAmenity.wifi_longitude)

                                    const apiService = new ApiService();
                                    const reviewDataPromise = apiService.getReview('wifi', wifiAmenity.id);

                                    reviewDataPromise.then((reviewData) => {

                                        var average_rating = 0;
                                        var undeleted_reviews = 0;

                                        reviewlist = '<ListGroup>';
                                        for (let i = 0; i < reviewData.length; i++) {
                                            if (reviewData[i].is_deleted === false) {
                                                reviewlist = reviewlist.concat(`<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                                
                                                <div className="ms-2 me-auto">
                                                 
                                                    <div className="fw-bold">User ID: ${reviewData[i].user}  |  Rating: ${reviewData[i].rating} </div>
                                                        ${reviewData[i].review}
                                                        <br></br>
                                                        Likes: ${reviewData[i].upvotes} Dislikes: ${reviewData[i].downvotes} 
                                                        <br></br>
                                                        <button className="buttonlike">Like</button> <button className="buttonflag">Flag</button> <button className="buttondislike">Dislike</button>
                                                    </div>
                                                    
                                                </ListGroup.Item>
                                                `);
                                                average_rating = average_rating + reviewData[i].rating;
                                                undeleted_reviews++;

                                            }
                                        }
                                        average_rating = average_rating / undeleted_reviews;
                                        reviewlist = reviewlist.concat('</ListGroup>');

                                        offcanvastitle = 'Wifi Amenity, ID:' + wifiAmenity.id + ' ';
                                        if (undeleted_reviews > 0) {
                                            rating_average = "Average Rating: " + average_rating;
                                        } else {
                                            rating_average = 'No Reviews Yet';
                                        }
                                        handleShow();
                                    });
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
                                onClick={() => {

                                    setDestLat(parkingAmenity.parking_latitude)
                                    setDestLng(parkingAmenity.parking_longitude)

                                    const apiService = new ApiService();
                                    const reviewDataPromise = apiService.getReview('parking', parkingAmenity.id);

                                    reviewDataPromise.then((reviewData) => {

                                        var average_rating = 0;
                                        var undeleted_reviews = 0;

                                        reviewlist = '<ListGroup>';
                                        for (let i = 0; i < reviewData.length; i++) {
                                            if (reviewData[i].is_deleted === false) {
                                                reviewlist = reviewlist.concat(`<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                                
                                                <div className="ms-2 me-auto">
                                                 
                                                    <div className="fw-bold">User ID: ${reviewData[i].user}  |  Rating: ${reviewData[i].rating} </div>
                                                        ${reviewData[i].review}
                                                        <br></br>
                                                        Likes: ${reviewData[i].upvotes} Dislikes: ${reviewData[i].downvotes} 
                                                        <br></br>
                                                        <button className="buttonlike">Like</button> <button className="buttonflag">Flag</button> <button className="buttondislike">Dislike</button>
                                                    </div>
                                                    
                                                </ListGroup.Item>
                                                `);
                                                average_rating = average_rating + reviewData[i].rating;
                                                undeleted_reviews++;

                                            }
                                        }
                                        average_rating = average_rating / undeleted_reviews;
                                        reviewlist = reviewlist.concat('</ListGroup>');

                                        offcanvastitle = 'Parking Amenity, ID:' + parkingAmenity.id + ' ';
                                        if (undeleted_reviews > 0) {
                                            rating_average = "Average Rating: " + average_rating;
                                        } else {
                                            rating_average = 'No Reviews Yet';
                                        }
                                        handleShow();
                                    });
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
                                onClick={() => {

                                    setDestLat(benchAmenity.bench_latitude)
                                    setDestLng(benchAmenity.bench_longitude)

                                    const apiService = new ApiService();
                                    const reviewDataPromise = apiService.getReview('bench', benchAmenity.id);

                                    reviewDataPromise.then((reviewData) => {

                                        var average_rating = 0;
                                        var undeleted_reviews = 0;

                                        reviewlist = '<ListGroup>';
                                        for (let i = 0; i < reviewData.length; i++) {
                                            if (reviewData[i].is_deleted === false) {
                                                reviewlist = reviewlist.concat(`<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                                
                                                <div className="ms-2 me-auto">
                                                 
                                                    <div className="fw-bold">User ID: ${reviewData[i].user}  |  Rating: ${reviewData[i].rating} </div>
                                                        ${reviewData[i].review}
                                                        <br></br>
                                                        Likes: ${reviewData[i].upvotes} Dislikes: ${reviewData[i].downvotes} 
                                                        <br></br>
                                                        <button className="buttonlike">Like</button> <button className="buttonflag">Flag</button> <button className="buttondislike">Dislike</button>
                                                    </div>
                                                    
                                                </ListGroup.Item>
                                                `);
                                                average_rating = average_rating + reviewData[i].rating;
                                                undeleted_reviews++;

                                            }
                                        }
                                        average_rating = average_rating / undeleted_reviews;
                                        reviewlist = reviewlist.concat('</ListGroup>');

                                        offcanvastitle = 'Bench Amenity, ID:' + benchAmenity.id + ' ';
                                        if (undeleted_reviews > 0) {
                                            rating_average = "Average Rating: " + average_rating;
                                        } else {
                                            rating_average = 'No Reviews Yet';
                                        }
                                        handleShow();
                                    });
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


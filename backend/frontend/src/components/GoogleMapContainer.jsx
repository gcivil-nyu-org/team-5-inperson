import React, { useState } from 'react'
import {
    GoogleMap, useJsApiLoader,withGoogleMap,
    Marker,
    DirectionsRenderer,
    Autocomplete,
} from '@react-google-maps/api';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { IconButton, SkeletonText, Flex, HStack,Box,
    ButtonGroup,
    } from '@chakra-ui/react';
import { FaLocationArrow , FaTimes} from 'react-icons/fa';

const containerStyle = {
    width: '100vw',
    height: '82vh'
};

var offcanvastitle = 'Im a title!';
var offcanvasbody = 'Im a body!';


export const GoogleMapContainer = (props) => {

    const { waterAmenities, toiletAmenities, wifiAmenities, benchAmenities, parkingAmenities, mapCenter,
        setMapCenter, waterOn, wifiOn, benchOn, parkingOn, toiletOn } = props;
    
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const [isReallyLoaded, setIsReallyLoaded] = React.useState(false);
    
    setTimeout(() => {
        setIsReallyLoaded(true);
    }, 200);

    const [show, setShow] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);
    const [map,setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] =useState(null)
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
   
    async function calculateRoute(){
        // eslint-disable-next-line no-undef
        const directionsService= new google.maps.DirectionsService()
        const destination = {lat:destLat , lng: destLng}
        if (destLat==='' || destLng==='')
            return
        const results= await directionsService.route({
            origin:mapCenter,
            destination:destination,
            // eslint-disable-next-line no-undef
            travelMode:google.maps.TravelMode.WALKING
            
        })
        console.log(destination.lat, destination.lng)
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        console.log(('found directions'))
    }

    function clearRoute(){
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setDestLat('')
        setDestLng('')
        setMap(map)
    }
    
    return isLoaded ? (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
        >
        
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={17}
            options={{
                fullscreenControl:false,

            }}
            onLoad={map => setMap(map)}
        >
            {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)} 
        { /*   <Autocomplete
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
                        left: "48%",
                        top: "10px",
                        marginLeft: "-120px",
                        backgroundColor: "white"

                    }}
                />
                
                <IconButton
                    aria-label='center back'
                    icon={<FaLocationArrow />}
                    isRound
                    onClick={() =>{
                        map.panTo(mapCenter)
                    }}
                /> 
            </Autocomplete>
                */}
            
            <Offcanvas show={show} onHide={handleClose} scroll={false} backdrop={false} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{offcanvastitle}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {offcanvasbody} <br></br><br></br><Button variant="primary"
                      onClick={()=>{
                         
                            calculateRoute()
                            }} 
                            >Navigate to amenity</Button>{' '}
                </Offcanvas.Body>
            </Offcanvas>

            { /* Child components, such as markers, info windows, etc. */}
            {isReallyLoaded ?
                <>
                    {/* User location */}
                    <Marker
                        var position={mapCenter} />

                    {/* Amenities */}
                    {/* codepoints from https://fonts.google.com/icons */}

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
                                    offcanvastitle = 'Water Amenity, ID:' + waterAmenity.id;
                                    offcanvasbody = 'Lat: ' + waterAmenity.water_latitude + ' Lon:' + waterAmenity.water_longitude;
                                    setDestLat(waterAmenity.water_latitude)
                                    setDestLng(waterAmenity.water_longitude)
                                    handleShow();
                                    
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
                                    offcanvastitle = 'Toilet Amenity, ID:' + toiletAmenity.id;
                                    offcanvasbody = 'Lat: ' + toiletAmenity.toilet_latitude + ' Lon:' + toiletAmenity.toilet_longitude;
                                    setDestLat(toiletAmenity.toilet_latitude)
                                    setDestLng(toiletAmenity.toilet_longitude)
                                    handleShow();
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
                                    offcanvastitle = 'Wifi Amenity, ID:' + wifiAmenity.id;
                                    offcanvasbody = 'Lat: ' + wifiAmenity.wifi_latitude + ' Lon:' + wifiAmenity.wifi_longitude;
                                    setDestLat(wifiAmenity.wifi_latitude)
                                    setDestLng(wifiAmenity.wifi_longitude)
                                    handleShow();
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
                                    offcanvastitle = 'Parking Amenity, ID:' + parkingAmenity.id;
                                    offcanvasbody = 'Lat: ' + parkingAmenity.parking_latitude + ' Lon:' + parkingAmenity.parking_longitude;
                                    setDestLat(parkingAmenity.parking_latitude)
                                    setDestLng(parkingAmenity.parking_longitude)
                                    handleShow();
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
                                    offcanvastitle = 'Bench Amenity, ID:' + benchAmenity.id;
                                    offcanvasbody = 'Lat: ' + benchAmenity.bench_latitude + ' Lon:' + benchAmenity.bench_longitude;
                                    setDestLat(benchAmenity.bench_latitude)
                                    setDestLng(benchAmenity.bench_longitude)
                                    handleShow();
                                }} />
                        ))
                        : null}

                </>
                : null}
        
        <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
        >
        <HStack spacing={2} justifyContent='space-between'>
        
          <Box flexGrow={1}>
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
                        left: "48%",
                        top: "10px",
                        marginLeft: "-120px",
                        backgroundColor: "white"

                    }}
                />
            </Autocomplete>
          </Box>
          <div className="searchButtons">

          
                <ButtonGroup>
                    
                    <IconButton
                    aria-label='center back'
                    icon={<FaTimes />}
                    onClick= {() =>{clearRoute()}
                    
                    }
                    />
                    <IconButton
                        aria-label='center back'
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => {
                        map.panTo(mapCenter)
                        
                        }}
                    />
                </ButtonGroup>
            </div>
        </HStack>
        {/*<HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
        
                    </HStack>*/}
      </Box>
      </GoogleMap>
    </Flex>
    ) : <SkeletonText />//<>Loading</>
       // return <SkeletonText />
    
}


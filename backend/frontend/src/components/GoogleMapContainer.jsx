import '../styles/Form.css';
import React, { useState, useEffect } from 'react'
import {
    GoogleMap, Marker, DirectionsRenderer, Autocomplete,
} from '@react-google-maps/api';

import {
    IconButton, Flex, Stack, Box, ButtonGroup, Spacer, Tooltip
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { ApiService } from '../api-service';
import { Filters } from './Filters';

import { DetailPanel } from './DetailPanel';

const containerStyle = {
    width: '100vw',
    height: '92vh'
};

const apiService = new ApiService();

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

    const { waterAmenities, toiletAmenities, wifiAmenities, benchAmenities, parkingAmenities,
        mapCenter, setMapCenter, userLocation, setUserLocation, searchLocation, setSearchLocation,
        waterOn, wifiOn, benchOn, parkingOn, toiletOn,
        setWaterOn, setWifiOn, setBenchOn, setParkingOn, setToiletOn } = props;

    const [isReallyLoaded, setIsReallyLoaded] = React.useState(false);

    setTimeout(() => {
        setIsReallyLoaded(true);
    }, 200);
    
    const [autocomplete, setAutocomplete] = useState(null);
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [destLat, setDestLat] = useState('')
    const [destLng, setDestLng] = useState('')
    const [showDetailPanel, setShowDetailPanel] = useState(false);

    const [selectedAmenity, setSelectedAmenity] = useState("");
    const [selectedAmenityId, setSelectedAmenityId] = useState("");

    useEffect(() => {
        map?.panTo(mapCenter)
    }, [mapCenter])

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
            const searchLatLng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setSearchLocation(searchLatLng)
            setMapCenter(searchLatLng)
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }
    

    function clearRoute() {
        setDirectionsResponse(null)
        setDestLat('')
        setDestLng('')
        map.panTo(mapCenter)
        map.setZoom(17)
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
    }

    return (

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

            <DetailPanel 
                selectedAmenity = {selectedAmenity}
                authenticatedUser = {authenticatedUser}
                showDetailPanel = {showDetailPanel}
                setShowDetailPanel = {setShowDetailPanel}
                calculateRoute = {calculateRoute}
                mapCenter = {mapCenter}
                destLat = {destLat}
                destLng = {destLng}
                selectedAmenityId = {selectedAmenityId}
            />

            {isReallyLoaded ?
                <>

                    <Marker position={searchLocation} />

                    {/* user location marker */}
                    <div style={{ borderRadius: "50%", border: '2px solid teal' }}>
                        <Marker
                            icon='https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/20px-Location_dot_blue.svg.png'
                            position={userLocation}
                        >
                        </Marker>
                    </div>

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
                                    setShowDetailPanel(true)
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
                                    setShowDetailPanel(true)
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
                                    setShowDetailPanel(true)
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
                                    setShowDetailPanel(true)
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
                                    setShowDetailPanel(true)
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
                                    onClick={() => {
                                        map?.panTo(mapCenter)
                                        map.setZoom(17)
                                    }}
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
    )

}


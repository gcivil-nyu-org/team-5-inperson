import '../styles/Form.css';
import React, { useState, useEffect } from 'react'
import {
    GoogleMap, Marker, DirectionsRenderer, Autocomplete,
} from '@react-google-maps/api';

import {
    IconButton, Flex, Stack, Box, ButtonGroup, Spacer, Tooltip
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { Filters } from './Filters';

import { DetailPanel } from './DetailPanel';
import { AmenityMarkers } from './AmenityMarkers';

const containerStyle = {
    width: '100vw',
    height: '92vh'
};

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
        mapCenter, setMapCenter, userLocation, searchLocation, setSearchLocation,
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
    const [selectedAmenityType, setSelectedAmenityType] = useState("");
    const [selectedAmenityId, setSelectedAmenityId] = useState("");

    useEffect(() => {
        map?.panTo(mapCenter)
    }, [mapCenter])

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

    const onMarkerClick = (amenity, amenityType) => {
        if (!showDetailPanel){
        setDestLat(amenity[`${amenityType}_latitude`]);
        setDestLng(amenity[`${amenityType}_longitude`]);
        setSelectedAmenityType(amenityType);
        setSelectedAmenityId(amenity.id);
        setShowDetailPanel(true);
        }
        else{
            setShowDetailPanel(false)
        }
    };

    const markerDataMapping = {
        'water': {
            visibilityFilter: waterOn,
            amenities: waterAmenities,
        },
        'wifi': {
            visibilityFilter: wifiOn,
            amenities: wifiAmenities,
        },
        'parking': {
            visibilityFilter: parkingOn,
            amenities: parkingAmenities,
        },
        'bench': {
            visibilityFilter: benchOn,
            amenities: benchAmenities,
        },
        'toilet': {
            visibilityFilter: toiletOn,
            amenities: toiletAmenities,
        },
    };

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
                selectedAmenityType={selectedAmenityType}
                authenticatedUser={authenticatedUser}
                showDetailPanel={showDetailPanel}
                setShowDetailPanel={setShowDetailPanel}
                calculateRoute={calculateRoute}
                mapCenter={mapCenter}
                destLat={destLat}
                destLng={destLng}
                selectedAmenityId={selectedAmenityId}
            />

            {isReallyLoaded ?
                <>
                    <Marker position={searchLocation} />
                    {/* user location marker */}
                    <div style={{ borderRadius: "50%", border: '2px solid teal' }}>
                        <Marker
                            icon='https://i.ibb.co/z5GmCCg/bluedot-28x28.png'
                            position={userLocation}
                        >
                        </Marker>
                    </div>

                    {Object.keys(markerDataMapping).map((amenityType) => (
                        <AmenityMarkers
                            amenityType={amenityType}
                            visibilityFilter={markerDataMapping[amenityType].visibilityFilter}
                            amenities={markerDataMapping[amenityType].amenities}
                            selectedAmenityId={selectedAmenityId}
                            selectedAmenityType={selectedAmenityType}
                            onMarkerClick={onMarkerClick}
                            showDetailPanel={showDetailPanel}
                        />
                    ))}
                </>
                : null}

            <Flex>
                <Spacer />

                <Filters
                    markerDataMapping={markerDataMapping}
                    onFilterToggle={(amenityType) => {
                        if (amenityType === 'toilet') {
                            setToiletOn(!toiletOn)
                        }
                        if (amenityType === 'water') {
                            setWaterOn(!waterOn)
                        }
                        if (amenityType === 'parking') {
                            setParkingOn(!parkingOn)
                        }
                        if (amenityType === 'wifi') {
                            setWifiOn(!wifiOn)
                        }
                        if (amenityType === 'bench') {
                            setBenchOn(!benchOn)
                        }
                    }}
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

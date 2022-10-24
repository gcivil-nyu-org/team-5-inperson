import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

const containerStyle = {
    width: '100vw',
    height: '70vh'
};

var offcanvastitle = 'Im a title!';
var offcanvasbody = 'Im a body!';


export const GoogleMapContainer = (props) => {

    const { waterAmenities, toiletAmenities, wifiAmenities, benchAmenities, parkingAmenities, mapCenter, 
        waterOn, wifiOn, benchOn, parkingOn, toiletOn } = props;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const [isReallyLoaded, setIsReallyLoaded] = React.useState(false);

    setTimeout(() => {
        setIsReallyLoaded(true);
    }, 200);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const codepoints = {
        water: "\ue798",
        wifi: "\ue63e",
        bench: "\uefee",
        toilet: "\ue63d",
        parking: "\ue54f"
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={17}
        >
            <Offcanvas show={show} onHide={handleClose} scroll={false} backdrop={false} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{offcanvastitle}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {offcanvasbody} <br></br><br></br><Button variant="primary">Google Maps</Button>{' '} 
                </Offcanvas.Body>
            </Offcanvas>
            
            { /* Child components, such as markers, info windows, etc. */}
            {isReallyLoaded ?
                <>
                    {/* User location */}
                    <Marker
                        position={mapCenter} />

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
                                    handleShow();
                                 }} />
                        ))
                        : null}

                </>
                : null}
        </GoogleMap>
    ) : <>Loading</>
}


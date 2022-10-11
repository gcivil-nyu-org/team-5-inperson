import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '70vh'
};


export const GoogleMapContainer = (props) => {

    const { data, mapCenter, waterOn, wifiOn, benchOn, parkingOn, toiletOn } = props;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const [isReallyLoaded, setIsReallyLoaded] = React.useState(false);

    setTimeout(() => {
        setIsReallyLoaded(true);
    }, 200);

    const codepoints = {
        water: "\ue798",
        wifi: "\ue63e",
        bench: "\uefee",
        toilet: "\ue63d",
        parking: "\ue54f"
    }

    // let waterAmenities = []

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={16}
        >
            { /* Child components, such as markers, info windows, etc. */}
            {isReallyLoaded ?
                <>
                    {/* User location */}
                    <Marker
                        onLoad={() => { console.log('marker onload') }}
                        position={mapCenter} />

                    {/* Amenities */}
                    {/* codepoints from https://fonts.google.com/icons */}



                    {waterOn ?
                        <Marker
                            label={{
                                text: codepoints.water,
                                fontFamily: "Material Icons",
                                color: "#ffffff",
                                fontSize: "16px",
                            }}
                            position={{ lat: mapCenter.lat - 0.0003, lng: mapCenter.lng - 0.0019 }} />
                        : null}

                    {toiletOn ?
                        <Marker
                            label={{
                                text: codepoints.toilet,
                                fontFamily: "Material Icons",
                                color: "#ffffff",
                                fontSize: "16px",
                            }}
                            position={{ lat: mapCenter.lat + 0.00032, lng: mapCenter.lng + 0.003 }} />
                        : null}

                    {wifiOn ?
                        <Marker
                            label={{
                                text: codepoints.wifi,
                                fontFamily: "Material Icons",
                                color: "#ffffff",
                                fontSize: "16px",
                            }}
                            position={{ lat: mapCenter.lat + 0.00088, lng: mapCenter.lng + 0.0016 }} />
                        : null}

                    {parkingOn ?
                        <Marker
                            label={{
                                text: codepoints.parking,
                                fontFamily: "Material Icons",
                                color: "#ffffff",
                                fontSize: "16px",
                            }}
                            position={{ lat: mapCenter.lat + 0.00098, lng: mapCenter.lng - 0.0016 }} />
                        : null}

                    {benchOn ?
                        <Marker
                            label={{
                                text: codepoints.bench,
                                fontFamily: "Material Icons",
                                color: "#ffffff",
                                fontSize: "16px",
                            }}
                            position={{ lat: mapCenter.lat - 0.0015, lng: mapCenter.lng - 0.0006 }} />
                        : null}

                </>
                : null}
        </GoogleMap>
    ) : <>Loading</>
}


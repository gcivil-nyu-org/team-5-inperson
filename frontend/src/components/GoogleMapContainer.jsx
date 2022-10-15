import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '70vh'
};


export const GoogleMapContainer = (props) => {

    const { waterAmenities, toiletAmenities, wifiAmenities, benchAmenities, parkingAmenities, mapCenter, 
        waterOn, wifiOn, benchOn, parkingOn, toiletOn } = props;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAlY5HyxhDCzErdU_jPO38azUGZkejyeWM'
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
            zoom={15}
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
                        waterAmenities.slice(0, 100).map((waterAmenity) => (
                            <Marker
                                key={waterAmenity.id}
                                label={{
                                    text: codepoints.water,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: waterAmenity.water_latitude, lng: waterAmenity.water_longitude }} />
                        ))
                        : null}

                    {toiletOn ?
                        toiletAmenities.slice(0, 10).map((toiletAmenity) => (
                            <Marker
                                key={toiletAmenity.id}
                                label={{
                                    text: codepoints.toilet,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: toiletAmenity.toilet_latitude, lng: toiletAmenity.toilet_longitude }} />
                        ))
                        : null}

                    {wifiOn ?
                        wifiAmenities.slice(0, 10).map((wifiAmenity) => (
                            <Marker
                                key={wifiAmenity.id}
                                label={{
                                    text: codepoints.wifi,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: wifiAmenity.wifi_latitude, lng: wifiAmenity.wifi_longitude }} />
                        ))
                        : null}

                    {parkingOn ?
                        parkingAmenities.slice(0, 10).map((parkingAmenity) => (
                            <Marker
                                key={parkingAmenity.id}
                                label={{
                                    text: codepoints.parking,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: parkingAmenity.parking_latitude, lng: parkingAmenity.parking_longitude }} />
                        ))
                        : null}

                    {benchOn ?
                        benchAmenities.slice(0, 10).map((benchAmenity) => (
                            <Marker
                                key={benchAmenity.id}
                                label={{
                                    text: codepoints.bench,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: benchAmenity.bench_latitude, lng: benchAmenity.bench_longitude }} />
                        ))
                        : null}

                </>
                : null}
        </GoogleMap>
    ) : <>Loading</>
}


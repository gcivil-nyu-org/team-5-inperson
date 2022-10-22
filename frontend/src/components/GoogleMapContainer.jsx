import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '70vh'
};

export const amenityIconCodes = {
    water: "\ue798",
    wifi: "\ue63e",
    bench: "\uefee",
    toilet: "\ue63d",
    parking: "\ue54f"
}

export const GoogleMapContainer = (props) => {
    const { waterAmenities, toiletAmenities, wifiAmenities, benchAmenities, parkingAmenities, mapCenter,
        waterOn, wifiOn, benchOn, parkingOn, toiletOn } = props;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const [isReallyLoaded, setIsReallyLoaded] = React.useState(false);

    setTimeout(() => {
        setIsReallyLoaded(true);
    }, 200);


    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={17}
        >
            { /* Child components, such as markers, info windows, etc. */}
            {isReallyLoaded ?
                <>
                    {/* User location */}
                    <Marker
                        dataTestId='user-location-marker'
                        position={mapCenter}
                    />


                    {/* Amenities */}
                    {/* amenityIconCodes from https://fonts.google.com/icons */}

                    {waterOn ?
                        waterAmenities.map((waterAmenity) => (
                            <Marker
                                dataTestId='water-marker'
                                key={waterAmenity.id}
                                label={{
                                    text: amenityIconCodes.water,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: waterAmenity.water_latitude, lng: waterAmenity.water_longitude }} />
                        ))
                        : null}

                    {toiletOn ?
                        toiletAmenities.map((toiletAmenity) => (
                            <Marker
                                dataTestId='toilet-marker'
                                key={toiletAmenity.id}
                                label={{
                                    text: amenityIconCodes.toilet,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: toiletAmenity.toilet_latitude, lng: toiletAmenity.toilet_longitude }} />
                        ))
                        : null}

                    {wifiOn ?
                        wifiAmenities.map((wifiAmenity) => (
                            <Marker
                                dataTestId='wifi-marker'
                                key={wifiAmenity.id}
                                label={{
                                    text: amenityIconCodes.wifi,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: wifiAmenity.wifi_latitude, lng: wifiAmenity.wifi_longitude }} />
                        ))
                        : null}

                    {parkingOn ?
                        parkingAmenities.map((parkingAmenity) => (
                            <Marker
                                dataTestId='parking-marker'
                                key={parkingAmenity.id}
                                label={{
                                    text: amenityIconCodes.parking,
                                    fontFamily: "Material Icons",
                                    color: "#ffffff",
                                    fontSize: "16px",
                                }}
                                position={{ lat: parkingAmenity.parking_latitude, lng: parkingAmenity.parking_longitude }} />
                        ))
                        : null}

                    {benchOn ?
                        benchAmenities.map((benchAmenity) => (
                            <Marker
                                dataTestId='bench-marker'
                                key={benchAmenity.id}
                                label={{
                                    text: amenityIconCodes.bench,
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


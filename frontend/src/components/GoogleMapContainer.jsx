import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '90vh'
};

const manhattanCenter = {
    lat: 40.71516924388475,
    lng: -74.0067231546892,
};

const markerPosition = {
    lat: 40.71516924388475,
    lng: -74.0067231546892,
};

export const GoogleMapContainer = () => {
    const [mapCenter, setMapCenter] = useState(manhattanCenter)
    useEffect(() => {
        // When component mounts
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                setMapCenter({
                    lat: Number(position.coords.latitude),
                    lng: Number(position.coords.longitude)
                })
            });
        }
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAlY5HyxhDCzErdU_jPO38azUGZkejyeWM"
    })

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
                    <Marker
                        // icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                        onLoad={() => { console.log('marker onload') }}
                        position={mapCenter} />

                    <Marker
                        label={{
                            text: "\ue798", // water codepoint from https://fonts.google.com/icons
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "16px",
                        }}
                        position={{ lat: mapCenter.lat - 0.0003, lng: mapCenter.lng - 0.0019 }} />

                    <Marker
                        label={{
                            text: "\ue63d", // bathroom codepoint from https://fonts.google.com/icons
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "16px",
                        }}
                        position={{ lat: mapCenter.lat + 0.00032, lng: mapCenter.lng + 0.003 }} />

                    <Marker
                        label={{
                            text: "\ue63e", // wifi codepoint from https://fonts.google.com/icons
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "16px",
                        }}
                        position={{ lat: mapCenter.lat + 0.00088, lng: mapCenter.lng + 0.0016 }} />

                    <Marker
                        label={{
                            text: "\ue54f", // parking codepoint from https://fonts.google.com/icons
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "16px",
                        }}
                        position={{ lat: mapCenter.lat + 0.00098, lng: mapCenter.lng - 0.0016 }} />

                    <Marker
                        label={{
                            text: "\uefee", // bench codepoint from https://fonts.google.com/icons
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "16px",
                        }}
                        position={{ lat: mapCenter.lat - 0.0015, lng: mapCenter.lng - 0.0006 }} />
                </>
                : null}
        </GoogleMap>
    ) : <>Loading</>
}


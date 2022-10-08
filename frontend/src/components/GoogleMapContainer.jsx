

// export const GoogleMapContainer = () => {
//     return (
//         <div className='google-map-container'>
//             Google map box
//         </div>
//     )
// }

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 40.71516924388475,
    lng: -74.0067231546892,
};

const markerPosition = {
    lat: 40.71516924388475,
    lng: -74.0067231546892,
};

export const GoogleMapContainer = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAlY5HyxhDCzErdU_jPO38azUGZkejyeWM"
    })

    // const [map, setMap] = React.useState(null)
    const [isReallyLoaded, setIsReallyLoaded] = React.useState(false);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        // setMap(map);
        console.log('In map onload');
        // setIsReallyLoaded(true);
    }, []);

    setTimeout(() => {
        setIsReallyLoaded(true);
    }, 200);

    // const onUnmount = React.useCallback(function callback(map) {
    //     // setMap(null)
    // }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={7}
            onLoad={onLoad}
            // onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            {isReallyLoaded ? <Marker
                icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                onLoad={() => { console.log('marker onload') }}
                position={markerPosition}
            /> : null}
        </GoogleMap>
    ) : <>Loading</>
}


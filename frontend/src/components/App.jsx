import '../styles/App.css';
import { GoogleMapContainer } from './GoogleMapContainer';
import { Filters } from './Filters';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const defaultCenter = {
  lat: 40.73122901747168,
  lng: -73.99733029154993
};

function App() {

  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [waterOn, setWaterOn] = useState(true);
  const [wifiOn, setWifiOn] = useState(true);
  const [benchOn, setBenchOn] = useState(true);
  const [parkingOn, setParkingOn] = useState(true);
  const [toiletOn, setToiletOn] = useState(true);

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

  const dummyData = {
    data: [
      {
        id: 1,
        lat: mapCenter.lat - 0.0003,
        lng: mapCenter.lng - 0.0019,
        type: "water"
      },
      {
        id: 2,
        lat: mapCenter.lat + 0.00032,
        lng: mapCenter.lng + 0.003,
        type: "toilet"
      },
      {
        id: 3,
        lat: mapCenter.lat + 0.00088,
        lng: mapCenter.lng + 0.0016,
        type: "wifi"
      },
      {
        id: 4,
        lat: mapCenter.lat + 0.00098,
        lng: mapCenter.lng - 0.0016,
        type: "parking"
      },
      {
        id: 5,
        lat: mapCenter.lat - 0.0015,
        lng: mapCenter.lng - 0.0006,
        type: "bench"
      },
    ]

  };

  return (
    <div className="app">
      <ChakraProvider>
        <Heading>NYC Basics</Heading>
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
        <GoogleMapContainer
          data={dummyData}
          mapCenter={mapCenter}
          waterOn={waterOn}
          wifiOn={wifiOn}
          benchOn={benchOn}
          parkingOn={parkingOn}
          toiletOn={toiletOn}
        />
      </ChakraProvider>
    </div>
  );
}

export default App;

import '../styles/App.css';
import { GoogleMapContainer } from './GoogleMapContainer';
import { Filters } from './Filters';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import BasicsNavbar from "./navigation/Navbar.jsx";
import { ApiService } from '../api-service';

const defaultCenter = {
  lat: 40.73122901747168,
  lng: -73.99733029154993
};



function App() {

  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [waterOn, setWaterOn] = useState(false);
  const [wifiOn, setWifiOn] = useState(false);
  const [benchOn, setBenchOn] = useState(false);
  const [parkingOn, setParkingOn] = useState(false);
  const [toiletOn, setToiletOn] = useState(false);
  const [waterAmenities, setWaterAmenities] = useState([]);
  const [wifiAmenities, setWifiAmenities] = useState([]);
  const [benchAmenities, setBenchAmenities] = useState([]);
  const [parkingAmenities, setParkingAmenities] = useState([]);
  const [toiletAmenities, setToiletAmenities] = useState([]);

  useEffect(() => {
    async function getAmenities(){
      const apiService = new ApiService();

      const waterData = await apiService.getWater();
      setWaterAmenities(waterData);

      const wifiData = await apiService.getWifi();
      setWifiAmenities(wifiData);

      const benchData = await apiService.getBench();
      setBenchAmenities(benchData);

      const parkingData = await apiService.getParking();
      setParkingAmenities(parkingData);

      const toiletData = await apiService.getToilet();
      setToiletAmenities(toiletData);

    }
    
    getAmenities()

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



  // const dummyData = {
  //   data: [
  //     {
  //       id: 1,
  //       lat: mapCenter.lat - 0.0003,
  //       lng: mapCenter.lng - 0.0019,
  //       type: "water"
  //     },
  //     {
  //       id: 2,
  //       lat: mapCenter.lat + 0.00032,
  //       lng: mapCenter.lng + 0.003,
  //       type: "toilet"
  //     },
  //     {
  //       id: 3,
  //       lat: mapCenter.lat + 0.00088,
  //       lng: mapCenter.lng + 0.0016,
  //       type: "wifi"
  //     },
  //     {
  //       id: 4,
  //       lat: mapCenter.lat + 0.00098,
  //       lng: mapCenter.lng - 0.0016,
  //       type: "parking"
  //     },
  //     {
  //       id: 5,
  //       lat: mapCenter.lat - 0.0015,
  //       lng: mapCenter.lng - 0.0006,
  //       type: "bench"
  //     },
  //   ]

  // };

  return (
    <div className="app">
      <div> <BasicsNavbar /></div>
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
          waterAmenities={waterAmenities}
          wifiAmenities={wifiAmenities}
          benchAmenities={benchAmenities}
          toiletAmenities={toiletAmenities}
          parkingAmenities={parkingAmenities}
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

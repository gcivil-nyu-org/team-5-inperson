import '../styles/App.css';
import { GoogleMapContainer } from './GoogleMapContainer';
import { Filters } from './Filters';
import { ChakraProvider } from '@chakra-ui/react'
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

    // When component mounts
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // setMapCenter({
        //   lat: Number(position.coords.latitude),
        //   lng: Number(position.coords.longitude)
        // })

        // switched to defaul location for testing by viha
        setMapCenter(defaultCenter)
        
      });
    }
  }, [])

  useEffect(() => {
    async function getAmenities(){
      const apiService = new ApiService();

      const waterData = await apiService.getWater(mapCenter);
      setWaterAmenities(waterData);

      const wifiData = await apiService.getWifi(mapCenter);
      setWifiAmenities(wifiData);

      const benchData = await apiService.getBench(mapCenter);
      setBenchAmenities(benchData);

      const parkingData = await apiService.getParking(mapCenter);
      setParkingAmenities(parkingData);

      const toiletData = await apiService.getToilet(mapCenter);
      setToiletAmenities(toiletData);

    }
    
    getAmenities()

  }, [mapCenter])


  return (
    <div className="app">
      <div> <BasicsNavbar /></div>
      <ChakraProvider>
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

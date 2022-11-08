import '../styles/App.css';
import { GoogleMapContainer } from './GoogleMapContainer';
import { Filters } from './Filters';
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiService } from '../api-service';

const defaultCenter = {
  lat: 40.73122901747168,
  lng: -73.99733029154993
};

const testingCenter = {
  lat: 40.69447082266228,
  lng: -73.9863413463988
};

var amenity_type_example = 'water';
var amenity_id_example = 95;

function MainSearch() {

  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [amenity_type, set_Amenity_type] = useState([]);
  const [amenity_id, set_Amenity_id] = useState([]);
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
  const [reviewDataAmenities, setReviews] = useState([]);

  useEffect(() => {

    // When component mounts
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // setMapCenter({
        //   lat: Number(position.coords.latitude),
        //   lng: Number(position.coords.longitude)
        // })

        // switched to testing location for developer testing by viha
        setMapCenter(testingCenter)
        set_Amenity_id(amenity_id_example)
        set_Amenity_type(amenity_type_example)
      },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            console.log("Location Access Rejected")
          }
        });
    }
  }, [])


  useEffect(() => {
    async function getAmenities() {
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

      const reviewData = await apiService.getReview(amenity_type,amenity_id);
      setReviews(reviewData);

    }

    getAmenities()

  }, [mapCenter])


  return (
    <div className="app">

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
        reviewDataAmenities={reviewDataAmenities}

        amenity_type={amenity_type}
        amenity_id={amenity_id}

      />
    </div>
  );
}

export default MainSearch;

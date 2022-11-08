import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap, DirectionsRenderer, useJsApiLoader} from "@react-google-maps/api";

import { ApiService } from '../api-service';
import { Link, Navigate } from "react-router-dom";
import {MainSearch} from './MainSearch';
import { GoogleMapContainer } from "./GoogleMapContainer";
import {defaultCenter,testingCenter} from './GoogleMapContainer'
import { useRef } from "react";
function navigateMap(){
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
     /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef=useRef()
     /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef=useRef()



}

export default navigateMap;

import '../styles/App.css';
import { GoogleMapContainer } from './GoogleMapContainer';
import { Filters } from './Filters';
import { ChakraProvider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import BasicsNavbar from "./navigation/Navbar.jsx";
import { ApiService } from '../api-service';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MainSearch from './MainSearch';
import { Login } from './Login';



function App() {

  return (
    <div className="app">
      <ChakraProvider>

        <BrowserRouter>
          <BasicsNavbar />
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<MainSearch />}></Route>
          </Routes>
        </BrowserRouter>


      </ChakraProvider>
    </div>
  );
}

export default App;

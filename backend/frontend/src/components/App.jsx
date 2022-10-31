import '../styles/App.css';
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import BasicsNavbar from "./Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainSearch from './MainSearch';
import Loginform from './Loginform';
import Signup from './Signup';

function App() {

  return (
    <div className="app">
      <ChakraProvider>
        <BrowserRouter>
          <BasicsNavbar />
          <Routes>
            <Route path='/login' element={<Loginform />}></Route>
            <Route path='/home' element={<MainSearch />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;

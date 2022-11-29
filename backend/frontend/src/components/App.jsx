import '../styles/App.css';
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import BasicsNavbar from "./Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainSearch from './MainSearch';
import Loginform from './Loginform';
import Signup from './Signup';
import EmailVerification from './EmailVerification';
import ResetPassword from './ResetPassword';
import ResetPassword2 from './ResetPassword2';
import About from './About';

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
                        <Route path='/verify' element={<EmailVerification />}></Route>
                        <Route path='/reset-pass' element={<ResetPassword />}></Route>
                        <Route path='/reset-pass-2' element={<ResetPassword2 />}></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </div>
    );
}

export default App;

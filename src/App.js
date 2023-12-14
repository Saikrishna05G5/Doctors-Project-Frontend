import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Doctorr from './Doctors/Doctorr';
import Patient from './Patients/Patient';
import Navigate from './Navigate';
import Home from './Home';
import NotFound from './NotFound';
import './App.css';

const App=()=>{
    return(
    <BrowserRouter>
    <Navigate/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Doctorr" element={<Doctorr/>}/>
        <Route path="/Patient" element={<Patient/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    )
}

export default App;
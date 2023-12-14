import React from "react";
import {Link} from 'react-router-dom';

const Navigate=()=>{
    return(
        <div className="navbar">
            <header id="logo">Trust<span>Cure+</span></header>
            <Link to="/">Home</Link>
            <Link to="/Doctorr">Doctor</Link>
            <Link to="/Patient">Patient</Link>

        </div>
    )
}

export default Navigate;

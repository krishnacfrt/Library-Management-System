import React from "react";
import { Link } from "react-router-dom";
import '../Css/Navbar.css'

function Navbar(){
    return (
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/students'}>Students</Link>
            <Link to={'/librarian'}>Librarian</Link>
        </nav>
    )
}

export default Navbar;
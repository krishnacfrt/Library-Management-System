import React from "react";
import '../Css/Home.css'

function Home(){
    return (
        <div className="container">
            <div>Welcome to Home page </div>
            <div className="card-container">
                <div className="card"> 
                    <a href="/students">Go to Student</a>
                </div>
                <div className="card">
                    <a href="/librarian"> Go To Admin</a>
                </div>
            </div>
        </div>
    )
}

export default Home;
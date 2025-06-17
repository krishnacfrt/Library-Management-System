import React from "react";
import "../Css/Home.css";
import { useBooks } from "../Css/book.js";

function Home() {

  return (
    <div className="container">
      <div>Welcome to Home page </div>
      <div className="card-container">
        <div className="count-card">
          <div className="card-icon">
            <h2>100K+</h2>
          </div>
          <div>
            <p> Active Users</p>
          </div>
        </div>
        <div className="count-card">
          <div className="card-icon">
            <h2>500+</h2>
          </div>
          <div>
            <p>Total Books</p>
          </div>
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <div className="card-icon">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <a href="/students"> Go to Student</a>
          </div>
        </div>
        <div className="card">
          <div className="card-icon">
            <i className="fa-solid fa-user-lock"></i>
          </div>
          <div>
            {" "}
            <a href="/librarian"> Go To Admin</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

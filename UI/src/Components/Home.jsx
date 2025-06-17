import React from "react";
import "../Css/Home.css";
import { fetchBooks, fetchUsersQuery, useBooks, useBooksQuery } from "../Css/book.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const {data:book={}}=  useBooksQuery({page:1, page_size:10})
  const {data: userList=[]}= fetchUsersQuery()
  const {total: totalBook} = book
  console.log(book, userList)
  const navigate= useNavigate()
  return (
    <div className="container">
      <div>Welcome to Home page </div>
      <div className="card-container">
        <div className="count-card">
          <div className="card-icon">
            <h2>{userList?.users?.length || 0}+</h2>
          </div>
          <div>
            <p> Active Users</p>
          </div>
        </div>
        <div className="count-card">
          <div className="card-icon">
            <h2>{totalBook}+</h2>
          </div>
          <div>
            <p>Total Books</p>
          </div>
        </div>
      </div>
      <div className="card-container">
        <div className="card" onClick={()=> navigate('/students')}>
          <div className="card-icon">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <a href="/students"> Go to Student</a>
          </div>
        </div>
        <div className="card" onClick={()=> navigate('/librarian')}>
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

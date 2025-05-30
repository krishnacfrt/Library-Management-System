import React, { useState } from "react";
import '../Css/Admin.css'
import SubmitBookModal from '../Modals/SubmitBookModal.jsx';
import UserRegistrationModal from '../Modals/RegisterUserModal.jsx';


function AdminDashbaord(){
    const [showSubmitModal, setShowSubmitModal]= useState(false);
    const [showUserModal, setShowUserModal]= useState(false)

    return (
        <div className="container">
            <div className="row">
                <div className="card" onClick={()=> setShowSubmitModal(true)}> Submit Books</div>
                <div className="card" onClick={()=> setShowUserModal(true)}> Register User</div>
            </div>
            <div className="row">
                <div className="card"> 
                  <a href="/home">  Go to books </a>
                </div>
                <div className="card"> Delete User</div>
            </div>
        <SubmitBookModal  isOpen={showSubmitModal} onClose={()=>setShowSubmitModal(false)}/>
            <UserRegistrationModal show={showUserModal} handleClose={()=>setShowUserModal(false)} />
        </div>
    )
}

export default AdminDashbaord;
import React, { useState } from "react";
import '../Css/Admin.css'
import SubmitBookModal from '../Modals/SubmitBookModal.jsx'
function AdminDashbaord(){
    const [showSubmitModal, setShowSubmitModal]= useState(false)
    return (
        <div className="container">
            <div className="row">
                <div className="card" onClick={()=> setShowSubmitModal(true)}> Submit Books</div>
                <div className="card"> Register User</div>
            </div>
            <div className="row">
                <div className="card"> Go to books</div>
                <div className="card"> Delete User</div>
            </div>
        <SubmitBookModal  isOpen={showSubmitModal} onClose={()=>setShowSubmitModal(false)}/>
        </div>
    )
}

export default AdminDashbaord;
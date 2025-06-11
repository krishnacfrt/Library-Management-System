import React, { useState } from "react";
import "../Css/Admin.css";
import SubmitBookModal from "../Modals/SubmitBookModal.jsx";
import UserRegistrationModal from "../Modals/RegisterUserModal.jsx";
import DeleteUserModal from "../Modals/DeleteUserModal.jsx";
import AdminAuth from "./AdminAuth.jsx";
import { useSelector } from "react-redux";
import AddBooksModal from "../Modals/AddBooksModal.jsx";
import AssignBooksModal from "../Modals/AssignBooksModal.jsx";


function AdminDashbaord() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {isAuthenticated}= useSelector((state)=> state.adminAuth)
  const [showAddBooksModal, setShowAddBooksModal] = useState(false);
  const [showAssignBooksModal, setShowAssignBooksModal] = useState(false);
  return (
    <>
    <div>
    {!isAuthenticated?
   <AdminAuth /> :
    <div className="admin-container">
      <div className="container-child container-child-admin">
        <i class="fa-solid fa-user-tie"></i>
        <h3>Admin Name</h3>
        <p>Admin id</p>
      </div>
      <div className="container-child">
      <div className="row">
        <div className="card" onClick={() => setShowSubmitModal(true)}>
          {" "}
          <div className="card-icon">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          Submit Books
        </div>
        <div className="card" onClick={() => setShowUserModal(true)}>
          {" "}
          <div className="card-icon">
            <i class="fa-solid fa-address-card"></i>
          </div>
          Register User
        </div>
        <div className="card" onClick={() => setShowAssignBooksModal(true)}>
          <div className="card-icon">
            <i class="fa-regular fa-rectangle-list"></i>
          </div>
            Assign Books
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="card-icon">
            <i class="fa-solid fa-book"></i> 
          </div>
          <div>
            Go to books
          </div>
        </div>
        <div className="card" onClick={() => setShowDeleteModal(true)}>
          <div className="card-icon">
            <i class="fa-solid fa-trash-can"></i>
          </div>
          <div> Delete User</div>
        </div>
        <div className="card" onClick={() => setShowDeleteModal(true)}>
          <div className="card-icon">
            <i class="fa-solid fa-users"></i>
          </div>
          <div> All Users</div>
        </div>
      </div>
      </div>
    </div>
  }
      <SubmitBookModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
      />
      <UserRegistrationModal
        show={showUserModal}
        handleClose={() => setShowUserModal(false)}
      />
      <DeleteUserModal 
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
       />
       <AssignBooksModal show={showAssignBooksModal}
       handleClose={()=>setShowAssignBooksModal(false)}
       />
    </div>
    <div className="addbooks-btn" >
        <button onClick={() => setShowAddBooksModal(true)}>+ Add Books</button>
        <AddBooksModal 
        show={showAddBooksModal}
        handleClose={() => setShowAddBooksModal(false)}
       />
    </div>
    </>
  );
}

export default AdminDashbaord;

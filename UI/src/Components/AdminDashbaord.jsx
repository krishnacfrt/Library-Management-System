import React, { useState } from "react";
import "../Css/Admin.css";
import SubmitBookModal from "../Modals/SubmitBookModal.jsx";
import UserRegistrationModal from "../Modals/RegisterUserModal.jsx";
import DeleteUserModal from "../Modals/DeleteUserModal.jsx";

function AdminDashbaord() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="container">
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
      </div>
      <div className="row">
        <div className="card">
          <div className="card-icon">
            <i class="fa-solid fa-book"></i> 
          </div>
          <div>
            <a href="/home"> Go to books </a>
          </div>
        </div>
        <div>
          <div className="card" onClick={() => setShowDeleteModal(true)}>
            <div className="card-icon">
              <i class="fa-solid fa-trash-can"></i>
            </div>
            <div> Delete User</div>
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default AdminDashbaord;

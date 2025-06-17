import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Admin.css";
import SubmitBookModal from "../Modals/SubmitBookModal.jsx";
import UserRegistrationModal from "../Modals/RegisterUserModal.jsx";
import DeleteUserModal from "../Modals/DeleteUserModal.jsx";
import AdminAuth from "./AdminAuth.jsx";
import { useSelector, useDispatch } from "react-redux";
import AddBooksModal from "../Modals/AddBooksModal.jsx";
import AssignBooksModal from "../Modals/AssignBooksModal.jsx";
import { setAuthentication } from "../redux/adminAuthSlice";

function AdminDashbaord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddBooksModal, setShowAddBooksModal] = useState(false);
  const [showAssignBooksModal, setShowAssignBooksModal] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.adminAuth);

  // Logout handler
  const handleLogout = () => {
    dispatch(setAuthentication(false));
    // Optionally reset other admin state here
  };

  if (!isAuthenticated) {
    return <AdminAuth />;
  }

  return (
    <>
      <div className="admin-container">
        <div className="container-child container-child-admin">
          <i className="fa-solid fa-user-tie"></i>
          <h3>Admin Name</h3>
          <p>Admin id</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="container-child">
          <div className="row">
            <div className="card" onClick={() => setShowSubmitModal(true)}>
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              Submit Books
            </div>
            <div className="card" onClick={() => setShowUserModal(true)}>
              <div className="card-icon">
                <i className="fa-solid fa-address-card"></i>
              </div>
              Register User
            </div>
            <div className="card" onClick={() => setShowAssignBooksModal(true)}>
              <div className="card-icon">
                <i className="fa-regular fa-rectangle-list"></i>
              </div>
              Assign Books
            </div>
          </div>
          <div className="row">
            <div className="card" onClick={() => navigate("/students")}>
              <div className="card-icon">
                <i className="fa-solid fa-book"></i>
              </div>
              <div>Go to books</div>
            </div>
            <div className="card" onClick={() => setShowDeleteModal(true)}>
              <div className="card-icon">
                <i className="fa-solid fa-trash-can"></i>
              </div>
              <div>Delete User</div>
            </div>
            <div className="card" onClick={() => navigate("/users")}>
              <div className="card-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <div>All Users</div>
            </div>
          </div>
        </div>
      </div>

      {showSubmitModal && (
        <SubmitBookModal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
        />
      )}
      {showUserModal && (
        <UserRegistrationModal
          show={showUserModal}
          handleClose={() => setShowUserModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteUserModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
        />
      )}
      {showAssignBooksModal && (
        <AssignBooksModal
          show={showAssignBooksModal}
          handleClose={() => setShowAssignBooksModal(false)}
        />
      )}
      <div className="addbooks-btn">
        <button onClick={() => setShowAddBooksModal(true)}>+ Add Books</button>
        {showAddBooksModal && (
          <AddBooksModal
            show={showAddBooksModal}
            handleClose={() => setShowAddBooksModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default AdminDashbaord;
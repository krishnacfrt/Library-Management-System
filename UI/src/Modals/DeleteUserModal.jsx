import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/RegisterUser.css";

const DeleteUserModal = ({ show, handleClose }) => {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleFetchUser = async (e) => {
    e.preventDefault();
    setFetching(true);
    setError("");
    setUserDetails(null);
    try {
      const res = await axios.get(`/users/${userId}`);
      if (res.data && res.data.user) {
        setUserDetails(res.data.user);
      } else {
        setError("User not found.");
      }
    } catch (err) {
      setError("User not found.");
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await axios.delete(`/users/${userId}`);
      toast.success("User deleted successfully!");
      setUserDetails(null);
      setUserId("");
      handleClose();
    } catch (err) {
      setError("Failed to delete user.");
      toast.error("Failed to delete user.");
    } finally {
      setDeleting(false);
    }
  };

  const handleModalClose = () => {
    setUserId("");
    setUserDetails(null);
    setError("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} dialogClassName="custom-modal">
      <Modal.Header>
        <button type="button" className="close-btn" onClick={handleModalClose}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <h4 className="modal-title">Delete User</h4>
        <Form onSubmit={handleFetchUser}>
          <div className="form-group">
            <label className="form-label">User ID:</label>
            <input
              type="text"
              className="form-control"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <Button
            variant="info"
            type="submit"
            className="submit-btn"
            disabled={fetching || !userId}
          >
            {fetching ? <Spinner animation="border" size="sm" /> : "Fetch User"}
          </Button>
        </Form>
        {error && <div className="text-danger mt-2">{error}</div>}
        {userDetails && (
          <div className="user-details mt-4">
            <h5>User Details</h5>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Contact:</strong> {userDetails.contact}</p>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <Spinner animation="border" size="sm" /> : "Delete User"}
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUserModal;
import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/RegisterUser.css"; 

const UserRegistrationModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", formData);
      toast.success("User registered successfully!");
      handleClose();
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header>
          <button type="button" className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </Modal.Header>
        <Modal.Body>
          <h4 className="modal-title">User Registration</h4>
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">User ID:</label>
              <input type="text" className="form-control" name="userId" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Name:</label>
              <input type="text" className="form-control" name="name" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input type="email" className="form-control" name="email" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Contact:</label>
              <input type="text" className="form-control" name="contact" onChange={handleChange} required />
            </div>
            <Button variant="primary" type="submit" className="submit-btn">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserRegistrationModal;
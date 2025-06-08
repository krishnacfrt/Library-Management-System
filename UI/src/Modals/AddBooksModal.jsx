import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/RegisterUser.css"; 

const AddBooksMOdal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
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
      const resp= await axios.post("/users", formData);
      toast.success(`User registered successfully!`);
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
          <h4 className="modal-title">Add New Book</h4>
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Book Name:</label>
              <input type="text" className="form-control" name="name" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Book Id:</label>
              <input type="email" className="form-control" name="email" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Author Name:</label>
              <input type="text" className="form-control" name="contact" onChange={handleChange} required />
            </div>
            <Button variant="primary" type="submit" className="submit-btn">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddBooksMOdal;
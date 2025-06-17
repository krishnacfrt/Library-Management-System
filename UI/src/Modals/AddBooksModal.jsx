import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/RegisterUser.css"; 

const AddBooksMOdal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    published_date: "",
    author: "",
    standard: 0,
    category: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp= await axios.post("/books", formData);
      toast.success(`Book added successfully!`);
      handleClose();
    } catch (error) {
      toast.error(" Failed to add book!");
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
              <label className="form-label">Book Title:</label>
              <input type="text" className="form-control" name="title" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Author:</label>
              <input type="text" className="form-control" name="author" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Published date:</label>
              <input type="text" className="form-control" name="published_date" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Standard:</label>
              <input type="text" className="form-control" name="standard" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Category:</label>
              <input type="text" className="form-control" name="category" onChange={handleChange} required />
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

import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/AssignBooksModal.css";
import LMTable from "../Util/LMTable";
import AssignBookSearchTable from "../Util/AssignBookSearchTable";
const AssignBooksModal = ({ show, handleClose }) => {
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
      const resp = await axios.post("/users", formData);
      toast.success(`User registered successfully!`);
      handleClose();
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName='assign-custom-modal'>
        <Modal.Header>
          <button type='button' className='close-btn' onClick={handleClose}>
            &times;
          </button>
        </Modal.Header>
        <Modal.Body>
          <h4 className='modal-title'>Assign Books</h4>
          <Form onSubmit={handleSubmit}>
            <div className='assign-form-group'>
            <div>
              <p className='form-label'>Please select all the books and click on Go to Cart.</p>
            </div>
              {/* <input
                type='text'
                className='form-control'
                name='name'
                onChange={handleChange}
                placeholder="Search books to assign..."
                required
              /> */}
            </div>
            <AssignBookSearchTable/>
            <Button variant='primary' type='submit' className='submit-btn'>
              Go to cart
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssignBooksModal;

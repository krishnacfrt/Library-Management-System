import React, { useState } from "react";
import axios from "axios";
import "../css/SubmitBookModal.css"; 

const SubmitBookModal = ({ isOpen, onClose }) => {
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; 
  // example for /books get api call to show all book list, similarly for post
  const res= axios.get('/books').then(res=>res.data)
  console.log(res)
  const handleSubmit = () => {
    setLoading(true);
    setMessage("");

    axios.post("http://localhost:8000/submit", {
      userId: parseInt(userId),
      bookId: parseInt(bookId),
      returnDate,
    })
      .then((response) => {
        setMessage(`✅ Book returned! ${response.data.fine}`);
        setLoading(false);
      })
      .catch((error) => {
        setMessage(`❌ Error: ${error.response?.data?.detail || "Something went wrong"}`);
        setLoading(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="top-close-btn" onClick={onClose}>✖</button>
        <h2>Submit a Book</h2>

        <div className="form-group">
          <label>User ID:</label>
          <input type="number" placeholder="Enter User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Book ID:</label>
          <input type="number" placeholder="Enter Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Return Date:</label>
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Book"}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SubmitBookModal;
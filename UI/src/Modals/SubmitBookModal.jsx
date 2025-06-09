import React, { useState } from "react";
import axios from "axios";
import "../css/SubmitBookModal.css";
import { toast } from "react-toastify";

const SubmitBookModal = ({ isOpen, onClose }) => {
  const [bookId, setBookId] = useState("");
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  if (!isOpen) return null;

  // Fetch book details by bookId
  const handleFetchBook = async () => {
    if (!bookId) {
      toast.error("Please enter a Book ID.");
      return;
    }
    setFetching(true);
    setBookDetails(null);
    try {
      const res = await axios.get(`/transaction/${bookId}`);
      setBookDetails(res.data);
      console.log("Book Details:", res.data);
      toast.success("Book details fetched!");
    } catch (error) {
      setBookDetails(null);
      toast.error(
        error.response?.data?.detail || "Book not found or error fetching details."
      );
    }
    setFetching(false);
  };

  // Submit book return
  const handleSubmit = async () => {
    if (!bookId) {
      toast.error("Please enter a Book ID.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/submit", {
        bookId: parseInt(bookId),
      });
      toast.success("✅ Book submitted successfully!");
      setBookDetails(null);
      setBookId("");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Error submitting the book."
      );
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="top-close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Submit a Book</h2>

        <div className="form-group">
          <label>Book ID:</label>
          <input
            type="number"
            placeholder="Enter Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            disabled={loading || fetching}
          />
          <button
            onClick={handleFetchBook}
            disabled={fetching || !bookId}
            style={{ marginLeft: "10px" }}
          >
            {fetching ? "Fetching..." : "Fetch Book"}
          </button>
        </div>

        {bookDetails && (
          <div className="book-details">
            <h4>Book Details</h4>
            <p>
              <strong>Title:</strong> {bookDetails.title}
            </p>
            <p>
              <strong>Author:</strong> {bookDetails.author}
            </p>
            {/* Add more fields as needed */}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!bookDetails || loading}
          className={bookDetails ? "active-submit-btn" : ""}
        >
          {loading ? "Submitting..." : "Submit Book"}
        </button>
      </div>
    </div>
  );
};

export default SubmitBookModal;
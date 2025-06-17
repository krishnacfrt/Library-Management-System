import React, { useState } from "react";
import axios from "axios";
import "../Css/AdminAuth.css";
import { useSelector, useDispatch } from "react-redux";
import { setShowAuthPage, setShowRegisterPage } from "../redux/adminAuthSlice";

const RegisterAdmin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { showRegisterPage } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/admin/register", {
        username: userId,
        password,
        security_code: "SECRET123",
      });
      if (response.status === 200) {
        dispatch(setShowAuthPage(true));
        dispatch(setShowRegisterPage(false));
      }
    } catch (err) {
      setError("Registration unsuccessful. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    setUserId("");
    setPassword("");
    setConfirmPassword("");
  };

  if (!showRegisterPage) return null;

  return (
    <div className="admin-auth-container">
      <form className="admin-auth-form" onSubmit={handleSubmit}>
        <h2>Admin Registration</h2>
        <label htmlFor="userId">Set Admin User ID</label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          autoFocus
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {error && (
          <div className="auth-error">
            <p>{error}</p>
            <button type="button" onClick={handleRetry}>
              Retry
            </button>
          </div>
        )}
        <div className="not-registered-block">
          <span>Already registered? </span>
          <button
            type="button"
            className="register-link"
            onClick={() => {
              dispatch(setShowRegisterPage(false));
              dispatch(setShowAuthPage(true));
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterAdmin;
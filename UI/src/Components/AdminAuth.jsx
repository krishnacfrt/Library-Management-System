import React, { useState } from "react";
import axios from "axios";
import "../Css/AdminAuth.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowAuthPage,
  setUserDetails,
  setAuthentication,
  setShowRegisterPage,
} from "../redux/adminAuthSlice";
import RegisterAdmin from "./RegisterAdmin";
import { toast } from "react-toastify";

const AdminAuth = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { showAuthPage, showRegisterPage } = useSelector(
    (state) => state.adminAuth
  );
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/admin/authenticate", {
        username: userId,
        password,
      });

      if (response.status === 200) {
        dispatch(setUserDetails(userId));
        dispatch(setShowAuthPage(false));
        dispatch(setShowRegisterPage(false));
        dispatch(setAuthentication(true));
        toast.success("Successfully logged In!");
      }
    } catch (err) {
      setError("Authentication unsuccessful. Please try again.");
      toast.error("Authentication unsuccessful. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    setUserId("");
    setPassword("");
  };

  // Render registration page if requested
  if (showRegisterPage) {
    return <RegisterAdmin />;
  }

  // Render login form if requested
  if (showAuthPage) {
    return (
      <div className="admin-auth-container">
        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <label htmlFor="userId">Admin User ID</label>
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

          <button type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
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
            <span>Not registered? </span>
            <button
              type="button"
              className="register-link"
              onClick={() => {
                dispatch(setShowAuthPage(false));
                dispatch(setShowRegisterPage(true));
              }}
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    );
  }

  // If neither auth nor register page should show, render nothing
  return null;
};

export default AdminAuth;
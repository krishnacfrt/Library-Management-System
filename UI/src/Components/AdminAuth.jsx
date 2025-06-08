import React, { useState } from "react";
import axios from "axios";
import "../Css/AdminAuth.css";

const AdminAuth = ({ onSuccess, showAuthPage }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    onSuccess();
    try {
      const response = await axios.post("/api/admin/auth", {
        userId,
        password,
      });
      onSuccess()
      if (response.status === 200) {
        onSuccess();
      }
    } catch (err) {
      setError("Authentication unsuccessful. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    setUserId("");
    setPassword("");
  };
  if(!showAuthPage){
    return null;
  }
  return (
    <>
      {showAuthPage?
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
        </form>
      </div> :
      <div></div>
      }
    </>
  );
};

export default AdminAuth;
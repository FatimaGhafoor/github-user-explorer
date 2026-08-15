import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGitHubAPI } from "../hooks/useGitHubAPI";
import "../styles/UserProfilePage.css";

export const UserProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { data: userData, loading, error, fetchingData } = useGitHubAPI();

  useEffect(() => {
    fetchData(`/users/${username}`);
  }, [username, fetchingData]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading {username}'s profile...</p>
        </div>
      </div>
    );
    if (error) {
      return (
        <div className="profile-container">
          <div className="error-state">
            <p className="error-message">{error}</p>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              ← Back to Home
            </button>
          </div>
        </div>
      );
    }

    if (!userData) {
      return (
        <div className="profile-container">
          <p>No data found</p>
        </div>
      );
    }
  }
};

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGitHubAPI } from "../hooks/useGitHubAPI";
import "../styles/UserProfilePage.css";

export const UserProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { data: userData, loading, error, fetchData } = useGitHubAPI();

  useEffect(() => {
    fetchData(`/users/${username}`);
  }, [username, fetchData]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading {username}'s profile...</p>
        </div>
      </div>
    );
  }
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

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Back to Search
        </button>
      </div>
      <div className="user-card">
        <div className="user-avatar-container">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="user-avatar"
          />
        </div>
        <div className="user-info">
          <h1>{userData.name || userData.login}</h1>
          {userData.bio && <p className="user-bio">{userData.bio} </p>}
          {userData.location && (
            <p className="user-location">📍 {userData.location}</p>
          )}
          {userData.blog && (
            <a
              href={userData.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="user-link"
            >
              🔗 {userData.blog}
            </a>
          )}
          {userData.company && (
            <p className="user-company">{userData.company}</p>
          )}
        </div>
        <div className="user-stats">
          <div className="stat">
            <span className="stat-icon">icon</span>
            <span className="stat-label">Followers</span>
            <span className="stat-value">{userData.followers}</span>
          </div>
        </div>
        <div className="user-actions">
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View GitHub Profile →
          </a>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            New Search
          </button>
        </div>
        <div className="user-meta">
          <p>
            <strong>Account Created:</strong>
            {new Date(userData.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {userData.updated_at && (
            <p>
              <strong>Last Updated:</strong>
              {new Date(userData.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

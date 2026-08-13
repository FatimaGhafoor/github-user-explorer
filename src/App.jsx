import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { useGitHubAPI } from "./hooks/useGitHubAPI";
import "./App.css";

function App() {
  const [searchedUser, setSearchedUser] = useState(null);
  const { data: userData, loading, error, fetchData } = useGitHubAPI();

  const handleSearch = async (username) => {
    console.log(`Searching for: ${username}`);
    await fetchData(`/users/${username}`);
    setSearchedUser(username);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GitHub User Explorer</h1>
        <p>
          Search for any GitHub user to explore their profile details and
          repositories
        </p>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={loading} />

      <main className="app-main">
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Searching for {searchedUser}...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-state">
            <p className="error-message">{error}</p>
            <p className="error-hint">
              Please try again or enter a different username
            </p>
          </div>
        )}

        {userData && !loading && (
          <div className="user-card">
            <div className="user-avatar-container">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="user-avatar"
              />
            </div>

            <div className="user-info">
              <h2 className="user-name">{userData.name || userData.login}</h2>

              {userData.bio && <p className="user-bio">{userData.bio}</p>}

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
                  {userData.blog}
                </a>
              )}
            </div>

            <div className="user-stats">
              <div className="stat">
                <span className="stat-icon">🔄</span>
                <span className="stat-label">Followers</span>
                <span className="stat-value">{userData.followers}</span>
              </div>

              <div className="stat">
                <span className="stat-icon">🔄</span>
                <span className="stat-label">Following</span>
                <span className="stat-value">{userData.following}</span>
              </div>

              <div className="stat">
                <span className="stat-icon">🔄</span>
                <span className="stat-label">Public Repos</span>
                <span className="stat-value">{userData.public_repos}</span>
              </div>

              <div className="stat">
                <span className="stat-icon">🔄</span>
                <span className="stat-label">Public Gists</span>
                <span className="stat-value">{userData.public_gists}</span>
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
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchedUser(null);
                }}
              >
                New Search
              </button>
            </div>

            <div className="user-meta">
              <p>
                <strong>Account Created:</strong>{" "}
                {new Date(userData.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {userData.updated_at && (
                <p>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(userData.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        )}

        {!userData && !loading && !error && (
          <div className="empty-state">
            <p className="empty-icon">🙋</p>
            <p className="empty-text">Enter a GitHub username to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

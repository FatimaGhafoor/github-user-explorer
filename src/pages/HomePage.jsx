import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import "../styles/HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleSearch = (username) => {
    navigate(`/users/${username}`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-hero">
          <h1 className="home-title">🔍 GitHub User Explorer</h1>
          <p className="home-subtitle">
            Search for any GitHub user to explore their complete profile and
            repositories
          </p>
        </div>
      </header>

      <div className="home-search-section">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="home-info">
        <div className="info-card">
          <div className="info-icon">👨‍💻</div>
          <h3>User Profiles</h3>
          <p>View public profiles of GitHub developers</p>
        </div>

        <div className="info-card">
          <div className="info-icon">📦</div>
          <h3>Repositories</h3>
          <p>Explore public repositories and project details</p>
        </div>

        <div className="info-card">
          <div className="info-icon">📊</div>
          <h3>Statistics</h3>
          <p>Track followers, repositories, contributions, and more</p>
        </div>

        <div className="info-card">
          <div className="info-icon">🔗</div>
          <h3>Social Links</h3>
          <p>Access website, location, and bio information</p>
        </div>
      </div>

      <footer className="home-footer">
        <p>Made with Fatima Ghafoor using React + GitHub API</p>
      </footer>
    </div>
  );
};

import { useState, useMemo } from "react";
import { RepoCard } from "./RepoCard";
import "./RepoList.css";

export const RepoList = ({ repos, loading, error }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const languages = useMemo(() => {
    if (!repos || repos.length === 0) return [];
    const langs = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return Array.from(langs).sort();
  }, [repos]);

  const processedRepos = useMemo(() => {
    if (!repos || repos.length === 0) return [];

    let filtered = repos;
    if (filterLanguage !== "all") {
      filtered = repos.filter((repo) => repo.language === filterLanguage);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "updated":
          return new Date(b.updated_at) - new Date(a.updated_at);
        default:
          return 0;
      }
    });

    return sorted;
  }, [repos, sortBy, filterLanguage]);

  const totalPages = Math.ceil(processedRepos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRepos = processedRepos.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };
  
  const handleLanguageChange = (value) => {
    setFilterLanguage(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="repo-list-container">
        <div className="loading-repos">
          <div className="spinner"></div>
          <p>Loading repositories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="repo-list-container">
        <div className="error-repos">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="repo-list-container">
        <div className="empty-repos">
          <p>No repositories found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="repo-list-container">
      <div className="repo-list-header">
        <h2>Public Repositories ({repos.length})</h2>
      </div>

      <div className="repo-controls">
        <div className="control-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-select"
          >
            <option value="stars">⭐ Most Stars</option>
            <option value="forks">🍴 Most Forks</option>
            <option value="updated">📅 Recently Updated</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="control-select"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="repo-count">
        Showing {processedRepos.length} of {repos.length} repositories
      </div>

      <div className="repo-list">
        {processedRepos.length > 0 ? (
          processedRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <div className="no-results">
            <p>No repositories match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState, useMemo } from "react";

export const RepoList = ({ repos, loading, error }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const languages = useMemo(() => {
    if (!repos || repos.length === 0) return [];

    const langs = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return Array.from(langs).sort();
  }, [repos]);

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

  return <div>Repo List Component Connected!</div>;
};

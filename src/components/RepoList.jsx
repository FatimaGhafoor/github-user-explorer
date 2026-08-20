import { useState, useMemo } from "react";

export const RepoList = ({ repos, loading, error }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [filterLanguage, setFilterLanguage] = useState("all");
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

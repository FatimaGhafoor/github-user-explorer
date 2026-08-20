export const RepoList = ({ repos, loading, error }) => {
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

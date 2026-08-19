export const RepoCard = ({ repo }) => {
  return (
    <div className="repo-card">
      <h3 className="repo-name">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link"
        >
          {repo.name}
        </a>
      </h3>

      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

      <div className="repo-meta">
        {repo.language && (
          <span className="repo-language">
            <span className="lang-dot"></span>
            {repo.language}
          </span>
        )}

        <span className="repo-stat">⭐ {repo.stargazers_count}</span>

        <span className="repo-stat">🍴 {repo.forks_count}</span>
      </div>

      {repo.updated_at && (
        <p className="repo-updated">
          Updated{" "}
          {new Date(repo.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      {repo.size && (
        <p className="repo-size">📦 {(repo.size / 1024).toFixed(1)} MB</p>
      )}
    </div>
  );
};

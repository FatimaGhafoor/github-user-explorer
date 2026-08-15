import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page not found</h2>
        <p className="not-found-message">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

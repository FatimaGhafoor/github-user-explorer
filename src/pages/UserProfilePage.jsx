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
};

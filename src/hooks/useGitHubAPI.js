import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_GITHUB_API_URL;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const cache = {};

export const useGitHubAPI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async (endpoint, skipCache = false) => {
    if (cache[endpoint] && !skipCache) {
      console.log(`Cache hit for ${endpoint}`);
      setData(cache[endpoint]);
      setError(null);
      return cache[endpoint];
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {},
      });

      cache[endpoint] = response.data;
      setData(response.data);

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.status === 404
          ? "❌ User not found (404)"
          : err.response?.status === 403
            ? "⚠️ Rate limit exceeded - try again later"
            : err.response?.status === 401
              ? "🔐 Invalid token"
              : err.message || "Network error";

      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

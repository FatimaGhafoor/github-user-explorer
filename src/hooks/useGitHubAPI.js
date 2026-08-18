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
    const FIVE_MINUTES = 5 * 60 * 1000;
    const cachedItem = cache[endpoint];

    if (cachedItem && !skipCache) {
      const isExpired = Date.now() - cachedItem.fetchedAt > FIVE_MINUTES;

      if (!isExpired) {
        console.log(`⚡ Fetching from Cache for: ${endpoint}`);
        setData(cachedItem.data);
        setError(null);
        return cachedItem.data;
      } else {
        console.log(
          `⏳ Cache expired for: ${endpoint}. Fetching fresh data...`,
        );
        delete cache[endpoint];
      }
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {},
      });

      cache[endpoint] = {
        data: response.data,
        fetchedAt: Date.now(),
      };

      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.status === 404
          ? "User or repository not found"
          : err.response?.status === 403
            ? "Rate limit exceeded"
            : err.message;

      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

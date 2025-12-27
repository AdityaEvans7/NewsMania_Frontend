import React, { useState } from "react";
import SearchBar from "./Searchbar";

const NewsContainer = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const q = query ? `?query=${encodeURIComponent(query)}` : "";
      const response = await fetch(`${import.meta.env.VITE_API_URL}/news${q}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const articles = Array.isArray(data) ? data : data.news || data.articles || [];
      if (articles.length > 0) {
        setNewsItems(articles);
      } else {
        setError("No news found for this search.");
        setNewsItems([]);
      }
    } catch (err) {
      console.error("fetchNews err:", err);
      setError("Failed to fetch news.");
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={fetchNews} />

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {newsItems.map((article, index) => (
            <div key={index} className="bg-white p-4 mb-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsContainer;

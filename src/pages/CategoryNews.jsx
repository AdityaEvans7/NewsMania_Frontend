import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

const CategoryNews = () => {
  const { categoryName } = useParams(); 
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const encoded = encodeURIComponent(categoryName || "");
        const response = await fetch(`${base}/news?category=${encoded}`);

        const data = await response.json();
        // backend returns an array of articles
        const articles = Array.isArray(data) ? data : data.articles || data.news || [];
        if (articles.length > 0) {
          setNewsItems(articles);
        } else {
          setError("No news found for this category.");
        }
      } catch (error) {
        setError("Failed to fetch category news.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">{categoryName} News</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {newsItems.map((article, index) => (
            <div key={index} className="bg-white p-4 mb-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNews;

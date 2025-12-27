import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Map frontend categories to NewsAPI-supported categories
const categoryMap = {
  Politics: "general",
  World: "general",
  Gaming: "technology",
  Education: "science",
  Finance: "business",
};

const CategoryNews = () => {
  const { categoryName } = useParams();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const base = import.meta.env.VITE_API_URL;
        if (!base) throw new Error("API base URL not configured");

        // Map category to supported value
        const mappedCategory = categoryMap[categoryName] || categoryName;
        const encodedCategory = encodeURIComponent(mappedCategory);

        const response = await fetch(
          `${base}/news?category=${encodedCategory}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        // Backend always returns an array
        if (Array.isArray(data) && data.length > 0) {
          setNewsItems(data);
        } else {
          setNewsItems([]);
          setError("No news found for this category.");
        }
      } catch (err) {
        console.error("Category fetch error:", err);
        setError("Failed to fetch category news.");
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryNews();
    }
  }, [categoryName]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center capitalize">
        {categoryName} News
      </h2>

      {loading && (
        <div className="text-center text-gray-600">Loading...</div>
      )}

      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2">
          {newsItems.map((article, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}

              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {article.description}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-block mt-3"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNews;

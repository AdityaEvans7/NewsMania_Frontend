import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Newspaper() {
  const { source } = useParams(); // e.g., "fox-news"
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSourceNews = async () => {
      try {
        setLoading(true);
        const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const encoded = encodeURIComponent(source);
        const res = await fetch(`${base}/news/${encoded}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (source) {
      fetchSourceNews();
    }
  }, [source]);

  if (loading) {
    return <div className="text-center py-4 text-gray-600">Loading {source} news...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {source.replace("-", " ")} - Latest News
      </h1>
      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg">{article.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline mt-4 inline-block"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No articles available for this source.</p>
      )}
    </div>
  );
}

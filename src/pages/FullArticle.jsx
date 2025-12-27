import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const FullArticle = () => {
  const location = useLocation();
  const { article } = location.state || {};

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    if (!article.content && !article.description) {
      alert("No content available to summarize");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: article.content || article.description }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        alert("Failed to generate summary");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching summary");
    }
    setLoading(false);
  };

  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">By {article.author || "Unknown"}</p>
      <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-lg mb-4">{article.content}</p>

      {/* Summarize Button */}
      <button
        onClick={getSummary}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Summarizing..." : "Summarize Article"}
      </button>

      {/* Display Summary */}
      {summary && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">AI Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-blue-600 underline"
      >
        Read more
      </a>
    </div>
  );
};

export default FullArticle;

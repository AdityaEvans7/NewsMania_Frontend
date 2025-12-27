import React, { useEffect, useState } from "react";

export default function ScrollingNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/news`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load trending news.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingNews();
  }, []);

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-sm md:text-base whitespace-nowrap px-2 bg-red-600 rounded">
          Trending
        </span>
        <div className="overflow-hidden w-full">
          {loading ? (
            <p className="text-sm md:text-base">Loading news...</p>
          ) : error ? (
            <p className="text-sm md:text-base text-red-400">{error}</p>
          ) : news.length > 0 ? (
            <div className="whitespace-nowrap animate-marquee">
              {news.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mx-6 text-sm md:text-base hover:underline"
                >
                  {item.title}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm md:text-base">No trending news available.</p>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 90s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

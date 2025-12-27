import React from "react";
import { useNavigate } from "react-router-dom";

const newsSources = [
  { id: "bbc-news", name: "BBC News", logo: "https://logo.clearbit.com/bbc.com" },
  { id: "cnn", name: "CNN", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg" },
  { id: "nyt", name: "The New York Times", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg" },
  { id: "the-times-of-india", name: "The Times of India", logo: "https://static.toiimg.com/photo/47529300.cms" },
  { id: "al-jazeera", name: "Al Jazeera", logo: "https://logos-world.net/wp-content/uploads/2023/04/Al-Jazeera-Logo.png" },
  { id: "fox-news", name: "Fox News", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg" },
  { id: "the-economic-times", name: "The Economic Times", logo: "https://img.etimg.com/photo/74230968.cms" },
  { id: "ndtv-news", name: "NDTV News", logo: "https://cdn.ndtv.com/common/images/ogndtv.png" },
];

const NewsCard = ({ user, setShowLogin }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (!user) {
      setShowLogin(true); // Show login if user is not authenticated
    } else {
      navigate(`/newspaper/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {newsSources.map((news) => (
        <div
          key={news.id}
          onClick={() => handleClick(news.id)}
          className="group bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
        >
          <img src={news.logo} alt={news.name} className="w-24 h-24 object-contain mb-3" />
          <h2 className="text-lg font-semibold">{news.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;

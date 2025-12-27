import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const newsSources = [
  { id: 'bbc-news', name: 'BBC News' },
  { id: 'cnn', name: 'CNN' },
  { id: 'nyt', name: 'The New York Times' },
  { id: 'the-times-of-india', name: 'The Times of India' },
  { id: 'al-jazeera', name: 'Al Jazeera' },
  { id: 'fox-news', name: 'Fox News' },
  { id: 'the-economic-times', name: 'The Economic Times' },
  { id: 'ndtv-news', name: 'NDTV News' },
];

const categories = [
  'Business', 'Technology', 'Health', 'Sports', 'Entertainment', 'Science',
  'Politics', 'World', 'Finance', 'Education', 'Gaming', 'Automobile', 'Fashion', 'Food'
];

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredNews = newsSources.filter(news => 
    news.name.toLowerCase().includes(query.toLowerCase())
  );
  
  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search news or categories..."
          className="w-full p-3 pr-12 text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {query && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredNews.length === 0 && filteredCategories.length === 0 && (
            <p className="p-2 text-gray-500 text-center">No results found</p>
          )}
          {filteredNews.map(news => (
            <div 
              key={news.id} 
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/newspaper/${news.id}`)}
            >
              {news.name}
            </div>
          ))}
          {filteredCategories.map(category => (
            <div 
              key={category} 
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/category/${category}`)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;

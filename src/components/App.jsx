import { useState, useEffect } from 'react';
import { Alert } from './Alert/Alert';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import LoginForm from './LoginForm/LoginForm';
import Product from './Product/Product';
import './App.css';
import axios from 'axios';
import Articles from './Articles/Articles';
import { fetchArticlesWithTopic } from '../articles-api';
import SearchForm from './Articles/SearchForm/SearchForm';

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return Number(savedClicks);
    }
    return 0;
  });

  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.localStorage.setItem('saved-clicks', clicks);
  }, [clicks]);

  //!============================================ HTTP запити ============================================

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async topic => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('products')}>Products</button>
        <button onClick={() => setActiveTab('alerts')}>Alerts</button>
        <button onClick={() => setActiveTab('feedback')}>Feedback</button>
        <button onClick={() => setActiveTab('login')}>Login</button>
        <button onClick={() => setActiveTab('latest articles')}>
          Latest articles
        </button>
      </nav>

      {activeTab === 'home' && (
        <div>
          <h1>Home</h1>
          <button onClick={() => setClicks(clicks + 1)}>
            You clicked {clicks} times
          </button>
          <button onClick={() => setClicks(0)}>Reset</button>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h1>Best selling</h1>
          <Product
            name="Tacos With Lime"
            imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
            price={10.99}
          />
          <Product
            name="Fries and Burger"
            imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?dpr=2&h=480&w=640"
            price={14.29}
          />
        </div>
      )}

      {activeTab === 'alerts' && (
        <div>
          <Alert variant="info">
            Would you like to browse our recommended products?
          </Alert>
          <Alert variant="error" outlined>
            There was an error during your last transaction
          </Alert>
          <Alert variant="success" elevated>
            Payment received, thank you for your purchase
          </Alert>
          <Alert variant="warning" outlined elevated>
            Please update your profile contact information
          </Alert>
        </div>
      )}

      {activeTab === 'feedback' && <FeedbackForm />}

      {activeTab === 'login' && <LoginForm />}

      {activeTab === 'latest articles' && (
        <div>
          <h2>Latest articles</h2>
          <SearchForm onSearch={handleSearch} />
          {loading && <p>Loading data, please wait...</p>}
          {error && <p>Whoops, something went wrong!</p>}
          {articles.length > 0 && <Articles articles={articles} />}
        </div>
      )}
    </div>
  );
}

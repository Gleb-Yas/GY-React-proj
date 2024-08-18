import { useState, useEffect } from 'react';
import { Alert } from './Alert/Alert';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import LoginForm from './LoginForm/LoginForm';
import Product from './Product/Product';
import './App.css';
import Articles from './Articles/Articles';
import { fetchArticlesWithTopic } from '../articles-api';
import SearchForm from './Articles/SearchForm/SearchForm';
import Player from './Player/Player';
import { Link, Route, Routes } from 'react-router-dom';

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return Number(savedClicks);
    }
    return 0;
  });

  useEffect(() => {
    window.localStorage.setItem('saved-clicks', clicks);
  }, [clicks]);

  //!============================ HTTP запити ============================================

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
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/login">Login</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/player">Player</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
              <button onClick={() => setClicks(clicks + 1)}>
                You clicked {clicks} times
              </button>
              <button onClick={() => setClicks(0)}>Reset</button>
            </div>
          }
        />
        <Route
          path="/products"
          element={
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
          }
        />
        <Route
          path="/alerts"
          element={
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
          }
        />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/articles"
          element={
            <div>
              <h2>Latest articles</h2>
              <SearchForm onSearch={handleSearch} />
              {loading && <p>Loading data, please wait...</p>}
              {error && <p>Whoops, something went wrong!</p>}
              {articles.length > 0 && <Articles articles={articles} />}
            </div>
          }
        />
        <Route
          path="/player"
          element={
            <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />
          }
        />
      </Routes>
    </div>
  );
}

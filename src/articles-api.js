import axios from 'axios';

export const fetchArticlesWithTopic = async topic => {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${topic}`
  );
  return response.data.hits;
};

import axios from 'axios';

const api = axios.create({
  baseURL: '/data',
});

export const fetchNews = async () => {
  const response = await api.get('/news.json');
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories.json');
  return response.data;
};

export const fetchVideos = async () => {
  const response = await api.get('/videos.json');
  return response.data;
};

import React, { useEffect, useState } from 'react';
import './App.css';
import ArticleTable from './components/ArticleTable';
import axios from 'axios';
import {Articles} from './interfaces/Articles';
import Nav from './components/Nav'


function App() {
  const [articles, setArticles] = useState<Articles[]>([])
  const apiUrl = 'https://api.zotero.org'
  const userId = '475425'
  const apiKey = '5682ibAO463E9hBv1yRJPqVm'
  const fetchArticles = async () => {
    try {
      const response = await axios.get(`https://api.zotero.org/users/475425/items?key=5682ibAO463E9hBv1yRJPqVm`)
      const articles = response.data

      const zoteroArticles: Articles[] = articles.map((item: Articles) => ({
        data: {
          key: item.data?.key,
          title: item.data?.title,
          creators: item.data?.creators,
          date: item.data?.date,
          url: item.data?.url || `${apiUrl}/users/${userId}/items?key=${apiKey}`,
          statut: 'unread',
          comment: '',
      },   
      key: item.data?.key,
    }))
      return zoteroArticles
    } catch (err) {
      console.error('Error fetching articles:', err);
      return [];
    }
  }

  const savedArticleToLocalStorage = (article: Articles[]) => {
    if (Array.isArray(article) && article.length > 0)
      localStorage.setItem('articles', JSON.stringify(article))
    else
      console.error('No articles to save');
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles();
      if (data && data.length > 0) {
        setArticles(data);
        savedArticleToLocalStorage(data);
      } else {
        const savedArticles = localStorage.getItem('articles')
        if (savedArticles)
          setArticles(JSON.parse(savedArticles));
        else 
          console.warn('No articles fetched to save');
      }
    }
    fetchData()
  }, [])

  return (
      <div className='App' style={{borderRadius: '12px'}}>
        <Nav articles={articles} />
        <ArticleTable articles={articles} setArticles={setArticles} />
      </div>
  );
}

export default App;

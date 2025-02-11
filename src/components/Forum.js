import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Forum = () => {
  const [articles, setArticles] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/forum');
        const data = await response.json();
        const articlesWithComments = data.map((article) => ({
          ...article,
          likes: Number(article.likes),
          dislikes: Number(article.dislikes),
          comment: article.comment || [], // Use the correct property name 'comment'
        }));
        setArticles(articlesWithComments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLike = async (articleId) => {
    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        return {
          ...article,
          likes: article.likes + 1,
        };
      }
      return article;
    });
    setArticles(updatedArticles);

    try {
      await fetch(`http://localhost:3001/forum/${articleId}/like`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleDislike = async (articleId) => {
    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        return {
          ...article,
          dislikes: article.dislikes + 1,
        };
      }
      return article;
    });
    setArticles(updatedArticles);

    try {
      await fetch(`http://localhost:3001/forum/${articleId}/dislike`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error disliking article:', error);
    }
  };

  const handleNewCommentSubmit = async (event, articleId) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:3001/forum/${articleId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment: newComment,
          }),
        });

        if (response.ok) {
          console.log('Comment saved successfully');
          const updatedArticles = articles.map((article) => {
            if (article.id === articleId) {
              return {
                ...article,
                comment: [...(article.comment || []), newComment],
              };
            }
            return article;
          });
          console.log('Updated articles:', updatedArticles);
          setArticles(updatedArticles);
          setNewComment('');
        } else {
          console.error('Failed to save comment:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error saving comment:', error);
      }
    }
  };

  return (
    <div className='forum-section'>
      <h1>Forum Section</h1>
      <Carousel className='control-arrow'>
        {articles.map((article) => (
          <div className='article-container' key={article.id}>
            <h3>{article.article}</h3>
            <p>{article.content}</p>
            <button onClick={() => handleLike(article.id)}>Like ({article.likes})</button>
            <button onClick={() => handleDislike(article.id)}>Dislike ({article.dislikes})</button>
            <h4>Comments</h4>
            {article.comment && article.comment.length > 0 ? (
              <ul>
                {article.comment.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
            <form className='comment-form' onSubmit={(event) => handleNewCommentSubmit(event, article.id)}>
              <input
                type='text'
                placeholder='Write your comment...'
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
              />
              <button type='submit'>Add Comment</button>
            </form>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Forum;

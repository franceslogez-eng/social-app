import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';

function Post({ post, onDelete, onRefresh }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(JSON.parse(localStorage.getItem('user')).id));
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.delete(`/api/posts/${post._id}/like`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLikes(likes - 1);
      } else {
        await axios.post(`/api/posts/${post._id}/like`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Error al dar like', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      try {
        await axios.delete(`/api/posts/${post._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onDelete(post._id);
      } catch (err) {
        console.error('Error al eliminar post', err);
      }
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter(comment => comment._id !== commentId));
  };

  return (
    <div className="post">
      <div className="post-header">
        <span 
          className="post-author" 
          onClick={() => navigate(`/profile/${post.author._id}`)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {post.author.name}
        </span>
        <span className="post-date">
          {new Date(post.createdAt).toLocaleDateString('es-ES')}
        </span>
        {currentUser.id === post.author._id && (
          <button 
            onClick={handleDelete}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: '#e74c3c',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Eliminar
          </button>
        )}
      </div>
      <div className="post-content">
        {post.content}
      </div>
      {post.image && (
        <img src={post.image} alt="Post" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }} />
      )}
      <div className="post-actions">
        <div className="post-action" onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'} {likes} Me gusta
        </div>
        <div className="post-action" onClick={() => setShowComments(!showComments)}>
          💬 {comments.length} Comentarios
        </div>
      </div>

      {showComments && (
        <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          <CommentForm postId={post._id} onCommentAdded={handleCommentAdded} />
          {comments.map(comment => (
            <div key={comment._id} style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
              <strong 
                onClick={() => navigate(`/profile/${comment.author._id}`)}
                style={{ cursor: 'pointer', color: '#1DA1F2' }}
              >
                {comment.author.name}
              </strong>
              <p style={{ color: '#666', marginTop: '5px' }}>{comment.content}</p>
              {currentUser.id === comment.author._id && (
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(`/api/posts/${post._id}/comments/${comment._id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      handleCommentDeleted(comment._id);
                    } catch (err) {
                      console.error('Error al eliminar comentario', err);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e74c3c',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;

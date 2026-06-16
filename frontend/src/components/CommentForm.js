import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/posts/${postId}/comments`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCommentAdded(response.data);
      setContent('');
    } catch (err) {
      setError('Error al crear el comentario');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe un comentario..."
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
      <button 
        type="submit"
        style={{
          background: '#1DA1F2',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        Comentar
      </button>
    </form>
  );
}

export default CommentForm;

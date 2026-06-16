import React, { useState } from 'react';
import axios from 'axios';

function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('El post no puede estar vacío');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/posts',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onPostCreated(response.data);
      setContent('');
    } catch (err) {
      setError('Error al crear el post');
    }
  };

  return (
    <div className="post-form">
      <h3 style={{ marginBottom: '15px' }}>¿Qué estás pensando?</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comparte tu pensamiento..."
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default PostForm;

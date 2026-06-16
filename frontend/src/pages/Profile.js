import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setCurrentUserId(userData?.id);
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setUser(response.data);
      
      const userData = JSON.parse(localStorage.getItem('user'));
      setIsFollowing(response.data.followers.includes(userData.id));
      
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar el perfil', err);
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      if (isFollowing) {
        await axios.delete(`/api/users/${id}/follow`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`/api/users/${id}/follow`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsFollowing(!isFollowing);
      fetchUserData();
    } catch (err) {
      console.error('Error al seguir/dejar de seguir', err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div>
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <div className="profile-stats">
              <span><strong>{user.followers.length}</strong> Seguidores</span>
              <span><strong>{user.following.length}</strong> Siguiendo</span>
            </div>
          </div>
          {currentUserId !== id && (
            <button 
              className={`follow-button ${isFollowing ? 'following' : ''}`}
              onClick={handleFollow}
            >
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>Posts de {user.name}</h3>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            Este usuario aún no tiene posts
          </div>
        ) : (
          posts.map(post => (
            <Post key={post._id} post={post} onRefresh={fetchUserData} />
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;

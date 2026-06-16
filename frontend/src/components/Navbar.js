import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="navbar">
      <h1 onClick={() => navigate('/feed')} style={{ cursor: 'pointer' }}>
        📱 Social App
      </h1>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span style={{ color: '#666' }}>Hola, {user?.name}</span>
        <button onClick={handleProfileClick} style={{ background: 'transparent', border: 'none', color: '#1DA1F2', cursor: 'pointer', textDecoration: 'underline' }}>
          Mi Perfil
        </button>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default Navbar;

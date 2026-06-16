# Red Social App 🌐

Una aplicación de red social moderna construida con React, Node.js y MongoDB.

## Características

- 👤 Autenticación de usuarios (JWT)
- 📝 Crear, editar y eliminar posts
- ❤️ Sistema de likes
- 💬 Comentarios en posts
- 👥 Seguir/Dejar de seguir usuarios
- 🔍 Buscar usuarios y posts
- 📱 Diseño responsivo
- 🔔 Notificaciones en tiempo real

## Requisitos previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Estructura del proyecto

```
social-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── App.js
    └── package.json
```

## Variables de entorno

Crear archivo `.env` en la carpeta `backend`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/social-app
JWT_SECRET=tu_secret_key_aqui
NODE_ENV=development
```

## API Endpoints

### Usuarios
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/users/:id` - Obtener perfil de usuario
- `PUT /api/users/:id` - Actualizar perfil

### Posts
- `GET /api/posts` - Obtener todos los posts
- `POST /api/posts` - Crear post
- `PUT /api/posts/:id` - Editar post
- `DELETE /api/posts/:id` - Eliminar post

### Likes
- `POST /api/posts/:id/like` - Dar like a un post
- `DELETE /api/posts/:id/like` - Quitar like

### Comentarios
- `POST /api/posts/:id/comments` - Agregar comentario
- `DELETE /api/posts/:id/comments/:commentId` - Eliminar comentario

### Seguimientos
- `POST /api/users/:id/follow` - Seguir usuario
- `DELETE /api/users/:id/follow` - Dejar de seguir

## Licencia

MIT
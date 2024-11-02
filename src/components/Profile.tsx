import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  //const [userData, setUserData] = useState(null);
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/profile') // Asegúrate de que la URL sea correcta
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el perfil:', error);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p>Nombre de usuario: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Profile;
